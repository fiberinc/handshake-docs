import assert from 'assert'
import { Image, Link, Paragraph, Text } from 'mdast'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * Use an image's alt text as a caption, adding it as a paragraph right after
 * the image element.
 */
export const addImageCaption: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'image', (node: Image, index, parent) => {
      // console.log('image visit', toString(node), node, index, parent?.type)

      // Don't know what this would mean.
      assert(index || index === 0)

      function isFilenameAlt(alt: string) {
        return alt.match(/^[^\s]+\.png$/)
      }

      if (!node.alt || isFilenameAlt(node.alt!)) {
        // Nothing to do. The image has no custom alt — it's just the filename
        // as default by Notion.
        return
      }

      const caption: Paragraph = {
        type: 'paragraph',
        // Make URLs in the alt text clickable.
        children: splitLinks(node.alt).map((part: string) => {
          if (part.startsWith('http')) {
            return {
              type: 'link',
              url: part,
              children: [
                { type: 'text', value: part.replace(/https?:\/\//, '') },
              ],
            } as Link
          }
          return {
            type: 'text',
            value: part,
          } as Text
        }),
      }

      parent.children = [
        ...parent.children.slice(0, index + 1),
        // Add the caption as a paragraph after the image.
        caption,
        ...parent.children.slice(index + 1),
      ]
    })
  }
}

// Split on links without getting rid of them.
function splitLinks(content: string) {
  return content.split(/(?=https?:\/\/[^ ]+)/g)
}
