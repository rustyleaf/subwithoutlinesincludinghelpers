/**
 * A simple command helper plugin to take a cursor snapshot.
 *
 * @type {Object}
 */

const helpers = {
  commands: {
    returnToCursorSnapshotPosition(editor, opts) {
      console.log("SNAPSHOT OBJ: ", opts);
      const { cursorPosition, cursorOffset } = opts.snapshot;
      return editor.focus().moveTo(cursorPosition, cursorOffset);
    },
    addNewSubtitle(editor, opts) {
      const { subtitle } = opts || {
        subtitle: {
          object: "block",
          type: "div",
          nodes: [
            {
              type: "p",
              object: "block",
              nodes: [
                {
                  object: "text",
                  leaves: [
                    {
                      text: ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
      const { document } = editor.value;
      const indexOfSelectedBlock = editor.getSubtitleIndex() + 1;

      return editor.insertNodeByKey(
        document.key,
        indexOfSelectedBlock,
        subtitle
      );
    },
    moveForwardXSubtitles(editor, x = 1) {
      const { value } = editor;
      const { document } = value;
      const currentSubtitleIndex = editor.getSubtitleIndex();
      const nextSubtitle = document.nodes.get(currentSubtitleIndex + x);
      editor.moveTo(nextSubtitle.key).focus();
    }
  },
  queries: {
    getlastWordOfBlock(editor) {
      const { startBlock } = editor.value;
      return startBlock.text.split(" ").pop();
    },
    getFirstWordOfBlock(editor) {
      const { startBlock } = editor.value;
      return startBlock.text.split(" ").shift();
    },
    getAllWordsinBlock(editor) {
      return startBlock.text.split(" ");
    },
    getAllLinesInSubtitle(editor) {
      const parent = editor.getParentSubtitle();
      return parent.nodes;
    },
    getCurrentLineIndexInSubtitle(editor) {
      const { startBlock } = editor.value;
      const nodes = editor.getAllLinesInSubtitle();
      return nodes.indexOf(startBlock);
    },
    getSubtitleLineCount(editor) {
      const nodes = editor.getAllLinesInSubtitle();
      return nodes.size;
    },
    getParentSubtitle(editor, opts) {
      const { startBlock, document } = editor.value;
      return document.getFurthestAncestor(
        startBlock.key,
        b => b.object !== "document"
      );
    },
    getAllSubtitles(editor) {
      const { document } = editor.value;
      return document.nodes;
    },
    getSubtitleIndex(editor) {
      const parent = editor.getParentSubtitle();
      return editor.getAllSubtitles().indexOf(parent);
    },
    getCursorSnapshot(editor) {
      const opts = {};
      opts.snapshot = {
        cursorPosition: editor.value.selection.focus.path,
        cursorOffset: editor.value.selection.focus.offset
      };
      return opts;
    }
  }
};

export default helpers;
