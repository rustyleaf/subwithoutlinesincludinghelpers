import { Editor } from "slate-react";
import { Block, Value } from "slate";

import React from "react";
import Keymap from "@convertkit/slate-keymap";
import helpers from "./helpers";
import initialValue from "./value.json";

const plugins = [
  helpers,
  Keymap({
    F2: (event, editor) => editor.addNewSubtitle()
  })
];

/**
 * The Cursor Snapshot example.
 *
 * @type {Component}
 */

class TestExample extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue)
  };

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    return (
      <Editor
        placeholder="Enter a title..."
        plugins={plugins}
        value={this.state.value}
        onChange={this.onChange}
        renderNode={this.renderNode}
      />
    );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    const violation = 50 - node.text.length < 0;

    switch (node.type) {
      case "div":
        return (
          <div className="div" {...attributes}>
            {children}
          </div>
        );
      case "p":
        return (
          <p className={violation ? "violation" : null} {...attributes}>
            {children}
            <span className="count">{50 - node.text.length}</span>
          </p>
        );
      default:
        return next();
    }
  };

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value });
  };
}

/**
 * Export.
 */

export default TestExample;
