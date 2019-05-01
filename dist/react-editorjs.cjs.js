'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es.array.filter');
require('core-js/modules/es.array.includes');
require('core-js/modules/es.array.reduce');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.string.includes');
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
require('regenerator-runtime/runtime');
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var EditorJS = _interopDefault(require('@editorjs/editorjs'));
var Header = _interopDefault(require('@editorjs/header'));
var List = _interopDefault(require('@editorjs/list'));
var InlineCode = _interopDefault(require('@editorjs/inline-code'));
var Image = _interopDefault(require('@editorjs/image'));
var Embed = _interopDefault(require('@editorjs/embed'));
var Quote = _interopDefault(require('@editorjs/quote'));
var Marker = _interopDefault(require('@editorjs/marker'));
var Code = _interopDefault(require('@editorjs/code'));
var Link = _interopDefault(require('@editorjs/link'));
var Delimiter = _interopDefault(require('@editorjs/delimiter'));
var Raw = _interopDefault(require('@editorjs/raw'));
var Table = _interopDefault(require('@editorjs/table'));
var Warning = _interopDefault(require('@editorjs/warning'));
var Paragraph = _interopDefault(require('@editorjs/paragraph'));
var Checklist = _interopDefault(require('@editorjs/checklist'));

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
    _this._el = React__default.createRef();
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
      return React__default.createElement('div', {
        id: holderId,
        ref: this._el
      });
    }
  }]);

  return Editor;
}(React.Component);

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

module.exports = Editor;
