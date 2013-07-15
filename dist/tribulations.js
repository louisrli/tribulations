/**
 * @classdesc A class for running through different, nested sections for a test,
 * automatically handling transitions between the section. 
 * For example: a test can have many conditions, each of which has blocks,
 * each of which has trials.
 * 
 * @constructor
*/

var Tribulations,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tribulations = (function($, _, Backbone, Marionette) {
  var module, _ref, _ref1;
  module = {};
  module.ExperimentRunnerView = (function(_super) {
    __extends(ExperimentRunnerView, _super);

    function ExperimentRunnerView() {
      _ref = ExperimentRunnerView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExperimentRunnerView.prototype.initialize = function() {
      var attr, s, _i, _len, _ref1;
      _ref1 = ["experimentStructure", "subviewClasses", "regionElement", "template"];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attr = _ref1[_i];
        if (!this.options[attr]) {
          console.error("Test runner was initialized without options." + attr + ".");
        }
      }
      this.template = this.options.template;
      this.addRegion("experimentRegion", this.options.regionElement);
      this.currentState = (function() {
        var _j, _len1, _ref2, _results;
        _ref2 = this.options.subviewClasses;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          s = _ref2[_j];
          _results.push(0);
        }
        return _results;
      }).call(this);
      this.currentDepth = 0;
      this.maxDepth = this.options.subviewClasses.length - 1;
      this.experimentStructure = this.options.experimentStructure;
      this.currentView = null;
      this.experimentFinished = false;
      this.on("runner:sectionBegin", this.sectionBegin);
      return this.on("runner:sectionEnd", this.sectionEnd);
    };

    ExperimentRunnerView.prototype.onRender = function() {
      return this.trigger("runner:sectionBegin");
    };

    ExperimentRunnerView.prototype.sectionBegin = function() {
      var ViewClass, currentNode, m, newView, rawModel, stateWithDepth;
      if (this.experimentFinished) {
        console.error("Received a sectionBegin event after experiment finished");
        return;
      }
      stateWithDepth = _.take(this.currentState, this.currentDepth + 1);
      currentNode = this.experimentStructure.getChildAtCoord(stateWithDepth);
      ViewClass = this.options.subviewClasses[this.currentDepth];
      rawModel = currentNode.get("innerModel");
      m = rawModel instanceof Backbone.Model ? rawModel : new Backbone.Model(rawModel);
      newView = new ViewClass({
        model: m,
        state: this.currentState
      });
      this.listenTo(newView, "runner:sectionEnd", function() {
        return this.trigger("runner:sectionEnd");
      });
      return this.experimentRegion.show(newView);
    };

    ExperimentRunnerView.prototype.sectionEnd = function() {
      if (this.experimentFinished) {
        console.error("Received a sectionEnd event after experiment finished");
        return;
      }
      if (this.currentDepth !== this.maxDepth) {
        this.currentDepth++;
      } else {
        while (this.currentDepth >= 0) {
          if (!this._isLastChild(this.experimentStructure, this.currentState, this.currentDepth)) {
            this.currentState[this.currentDepth]++;
            break;
          } else {
            this.currentState[this.currentDepth] = 0;
            this.currentDepth--;
          }
        }
      }
      if (this.currentDepth === -1) {
        this.experimentFinished = true;
        return this.trigger("runner:experimentEnd");
      } else {
        return this.trigger("runner:sectionBegin");
      }
    };

    ExperimentRunnerView.prototype._isLastChild = function(tree, state, depth) {
      var coords, numChildren;
      coords = _.take(state, (depth + 1) - 1);
      numChildren = tree.getChildrenAtCoord(coords).length;
      return state[depth] === numChildren - 1;
    };

    return ExperimentRunnerView;

  })(Backbone.Marionette.Layout);
  module.NodeModel = (function(_super) {
    __extends(NodeModel, _super);

    function NodeModel() {
      _ref1 = NodeModel.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    NodeModel.prototype.defaults = function() {
      return {
        children: new Array(),
        innerModel: null
      };
    };

    NodeModel.prototype.numChildren = function() {
      return this.get("children").length;
    };

    NodeModel.prototype.getChild = function(i) {
      return this.get("children")[i];
    };

    NodeModel.prototype.getChildAtCoord = function(coords) {
      var child, i, _i, _len;
      child = this;
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        i = coords[_i];
        child = child.getChild(i);
      }
      return child;
    };

    NodeModel.prototype.getChildrenAtCoord = function(coords) {
      var child, i, _i, _len;
      child = this;
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        i = coords[_i];
        child = child.getChild(i);
      }
      return child.get("children");
    };

    return NodeModel;

  })(Backbone.Model);
  return module;
})(jQuery, _, Backbone, Marionette);
