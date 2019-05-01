import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.reduce';
import 'core-js/modules/es.object.keys';
import 'core-js/modules/es.string.includes';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import 'regenerator-runtime/runtime';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Code from '@editorjs/code';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import Raw from '@editorjs/raw';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Paragraph from '@editorjs/paragraph';
import Checklist from '@editorjs/checklist';

var commonTools = {
  header: Header,
  list: List,
  image: Image,
  inlineCode: InlineCode,
  embed: Embed,
  quote: Quote,
  marker: Marker,
  code: Code,
  link: Link,
  delimiter: Delimiter,
  raw: Raw,
  table: Table,
  warning: Warning,
  paragraph: Paragraph,
  checklist: Checklist
};

var Editor =
/*#__PURE__*/
function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    var _this;

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).call(this, props));

    _this._initEditor = function () {
      var _this$props = _this.props,
          holderId = _this$props.holderId,
          autofocus = _this$props.autofocus,
          data = _this$props.data;
      _this.editor = new EditorJS({
        holderId: holderId,
        autofocus: autofocus,
        data: data,
        tools: _this._tools,
        onChange: _this._handleChange,
        onReady: _this._handleReady
      });
    };

    _this._initTools = function () {
      var _this$props2 = _this.props,
          customTools = _this$props2.customTools,
          excludeDefaultTools = _this$props2.excludeDefaultTools;

      var toolsList = _objectSpread({}, commonTools, customTools);

      if (excludeDefaultTools.length !== 0) {
        return Object.keys(toolsList).filter(function (tool) {
          return !excludeDefaultTools.includes(tool);
        }).reduce(function (acc, curr) {
          return _objectSpread({}, acc, _defineProperty({}, curr, toolsList[curr]));
        }, {});
      }

      return toolsList;
    };

    _this._handleChange =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var data;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.editor.save();

            case 2:
              data = _context.sent;

              _this._onChange(data);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this._handleReady = function () {
      _this._onReady();
    };

    _this._tools = _this._initTools(props.tools, props.excludeTools);
    _this._onChange = props.onChange;
    _this._onReady = props.onReady;
    _this._el = React.createRef();
    return _this;
  }

  _createClass(Editor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._initEditor();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof this.editor.destroy !== 'undefined') {
        this.editor.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var holderId = this.props.holderId;
      return React.createElement('div', {
        id: holderId,
        ref: this._el
      });
    }
  }]);

  return Editor;
}(Component);

Editor.defaultProps = {
  holderId: 'editorjs-holder',
  customTools: {},
  excludeDefaultTools: [],
  onChange: function onChange() {},
  onReady: function onReady() {},
  data: {},
  autofocus: true
};
Editor.propTypes = {
  holderId: PropTypes.string,
  customTools: PropTypes.object,
  excludeDefaultTools: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onReady: PropTypes.func,
  data: PropTypes.object,
  autofocus: PropTypes.bool
};

export default Editor;
