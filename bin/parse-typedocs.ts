// Parses provider typedocs and values from the handshake library and places it
// in a cleaner object inside `docs/providers.json`.
//
// You'll want to use this via the Makefile.

import lodash, { mapValues } from 'lodash';
import assert from 'assert';
import chalk from 'chalk';
import fs from 'fs';
// ATTENTION You must have handshake available in the parent folder.
import * as handshake from '../../handshake/handshake';
import docsJson from './providers-typedoc.json';

const DOCS_IMAGES_ABS_PATH =
	process.env.NODE_ENV === 'production'
		? 'https://handshake.cool/images/docs'
		: '/images/docs';

function extractClasses(docs: any) {
	const result: {
		id: string;
		objectName: string;
		title: string;
		website?: string;
		isFromNextAuth: boolean;
		takesSubdomainArg: boolean;
		// logo: string;
		blockTagsByName: Record<string, string | null>;
		docsUrl: string | null;
	}[] = [];

	// Traverse the JSON structure to find and format class documentation
	// This is a simplified example; you'll need to adapt it to your JSON structure
	docs.children.forEach((item: any) => {
		try {
			// Sanity checks to make sure we understand what's going on.
			if (item.variant !== 'declaration') {
				throw Error('unexpected');
			}
			if (item.sources.length !== 1) {
				throw Error('unexpected');
			}
			if (
				item.sources[0].fileName.match(/providers\/oauth\/[-_a-zA-Z]+.ts/) ===
					null &&
				item.sources[0].fileName.match(/providers\/[-_a-zA-Z]+.ts/) === null &&
				item.sources[0].fileName.match(
					/providers\/from-next-auth\/[-_a-zA-Z]+.ts/
				) === null
			) {
				console.log(
					chalk.dim(`ignoring ${item.name} inside ${item.sources[0].fileName}`)
				);
				return;
			}

			if (item.name.endsWith('Scope') || item.name.endsWith('Credential')) {
				console.log(
					chalk.dim(`ignoring ${item.name} inside ${item.sources[0].fileName}`)
				);
				return;
			}

			if (item.signatures.length !== 1) {
				throw Error('unexpected');
			}

			// const from = require('')[itemName]

			if (typeof handshake[item.name] !== 'function') {
				throw Error(`unexpected ${item.name}`);
			}

			const fromHandshake = handshake[item.name]({
				clientId: 'asdf',
				clientSecret: 'asdf',
				issuer: 'asdf',
				subdomain: 'asdf',
				scopes: ['asdf'],
				// Discogs
				consumerKey: 'asdf',
				consumerSecret: 'asdf',
			}).provider;
			const providerId = fromHandshake.id;
			assert(providerId);

			// console.log("metadata", metadata);

			let name = fromHandshake.name;
			if (providerId === 'twitter') {
				name = 'Twitter';
			}

			const website = fromHandshake.website || null;
			if (website) {
				if (!website.startsWith('https://')) {
					throw Error(`website ${website} is invalid`);
				}
			}

			const blockTagsByName = Object.fromEntries(
				(item.signatures[0].comment?.blockTags || []).map((f) => [
					f.tag.replace(/^@/, ''),
					f.content,
				])
			);

			function joinParsedContent(
				content: { kind: string; text: string }[] | undefined
			) {
				return (content || []).map((f) => f.text).join('\n') ?? null;
			}

			function replaceImageRoot(content: string) {
				return content.replace(/\/?DOC_IMAGES/g, DOCS_IMAGES_ABS_PATH);
			}

			const EXPECTED_BLOCK_TAGS = [
				'title',
				'redirect',
				'options',
				'troubleshoot',
				'providersetup',
				'reference',
			];
			for (const tag in blockTagsByName) {
				if (!EXPECTED_BLOCK_TAGS.includes(tag)) {
					throw Error(`provider ${name} has unexpected docustring tag ${tag}`);
				}
			}

			result.push({
				id: providerId,
				objectName: item.name,
				title: name,
				website,
				isFromNextAuth:
					item.sources[0].fileName.match(/from-next-auth/) !== null,
				takesSubdomainArg: JSON.stringify(item.signatures).includes(
					'subdomain'
				),
				// logo,
				blockTagsByName: mapValues(blockTagsByName, (body) =>
					replaceImageRoot(joinParsedContent(body ?? []))
				),
				docsUrl: joinParsedContent(blockTagsByName.reference ?? []),
			});
		} catch (e) {
			console.log('failed for item', item);
			throw e;
		}
	});

	return result;
}

const providerInfos = extractClasses(docsJson);

console.log('Extracted data about', providerInfos.length, 'providers');
// assert(providerInfos.length === 65, "Sanity check. Update this counter.");

// Write to CLASSES.md
fs.writeFileSync(
	__dirname + '/../providers.json',
	JSON.stringify(providerInfos, null, 2)
);
