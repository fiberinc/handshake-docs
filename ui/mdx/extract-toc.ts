import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export interface ContentHeading {
  value: string
  url: string
  depth: number
  parent: string
}

interface Options {
  titles: ContentHeading[]
}

/**
 * Takes a `title` variable and modifies it to include every heading in the
 * document. Used to make a table of contents separate from the markdown.
 *
 * From
 * https://github.com/hashicorp/next-mdx-remote/issues/395#issuecomment-1885907371
 */
export const extractToc: Plugin<[Options], any, any> = ({ titles }) => {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return (tree: any) =>
    visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node)
      const parentType = parent?.type

      titles.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: node.depth,
        parent: parentType,
      })
    })
}
