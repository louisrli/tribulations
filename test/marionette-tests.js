(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    var App, BlockSectionView, Blocks, ConditionSectionView, TrialSectionView, deq, inc, incAndTest, view, _ref, _ref1, _ref2;
    App = new Backbone.Marionette.Application();
    App.addRegions({
      mainRegion: "#main-region"
    });
    Blocks = {
      baz: [[1, 2, 3], [0]],
      foo: [[6, 7, 8], [9, 1, 2]],
      bar: [[1]]
    };
    App.loadExperimentData = function() {
      var block, blockNode, k, mainTest, realityChildren, realityNode, t, v, _i, _len;
      mainTest = new Tribulations.NodeModel;
      for (k in Blocks) {
        v = Blocks[k];
        realityNode = new Tribulations.NodeModel({
          innerModel: {
            name: k
          }
        });
        realityChildren = [];
        for (_i = 0, _len = v.length; _i < _len; _i++) {
          block = v[_i];
          blockNode = new Tribulations.NodeModel({
            children: (function() {
              var _j, _len1, _results;
              _results = [];
              for (_j = 0, _len1 = block.length; _j < _len1; _j++) {
                t = block[_j];
                _results.push(new Tribulations.NodeModel({
                  innerModel: {
                    number: t
                  }
                }));
              }
              return _results;
            })()
          });
          realityChildren.push(blockNode);
        }
        realityNode.set("children", realityChildren);
        mainTest.get("children").push(realityNode);
      }
      return mainTest;
    };
    ConditionSectionView = (function(_super) {
      __extends(ConditionSectionView, _super);

      function ConditionSectionView() {
        _ref = ConditionSectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ConditionSectionView.prototype.template = "#condition-template";

      return ConditionSectionView;

    })(Marionette.ItemView);
    BlockSectionView = (function(_super) {
      __extends(BlockSectionView, _super);

      function BlockSectionView() {
        _ref1 = BlockSectionView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      BlockSectionView.prototype.template = "#block-template";

      return BlockSectionView;

    })(Marionette.ItemView);
    TrialSectionView = (function(_super) {
      __extends(TrialSectionView, _super);

      function TrialSectionView() {
        _ref2 = TrialSectionView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      TrialSectionView.prototype.template = "#trial-template";

      return TrialSectionView;

    })(Marionette.ItemView);
    view = new Tribulations.ExperimentRunnerView({
      experimentStructure: App.loadExperimentData(),
      subviewClasses: [ConditionSectionView, BlockSectionView, TrialSectionView],
      regionElement: "#experiment-region",
      template: "#runner-template"
    });
    /*
    # Begin tests
    */

    deq = deepEqual;
    inc = function() {
      return view.trigger("runner:sectionEnd");
    };
    incAndTest = function(expectedState, message, callback) {
      inc();
      deq(view.currentState, expectedState);
      if (callback) {
        return callback();
      }
    };
    test('Initial state', function() {
      return deq(view.currentState, [0, 0, 0], 'Initial state should be 0,0,0');
    });
    test('Max depth correct', function() {
      return deq(view.maxDepth, 2, 'Max depth should be 2 for our test case, since we\
    have three view subclasses');
    });
    return test('increment', function() {
      module("Initial state");
      inc();
      deq(view.currentState, [0, 0, 0], 'Incrementing should only increase depth (0)');
      deq(view.currentDepth, 1, 'Incrementing should increase depth');
      inc();
      deq(view.currentState, [0, 0, 0], 'Incrementing should only increase depth (1)');
      deq(view.currentDepth, 2, 'Incrementing should increase depth');
      ok(view.currentDepth === view.maxDepth, 'We should be at the max depth');
      module("Testing progression through the tree");
      incAndTest([0, 0, 1]);
      incAndTest([0, 0, 2]);
      incAndTest([0, 1, 0], 'new block');
      incAndTest([0, 1, 0], 'new trial after block');
      incAndTest([1, 0, 0], 'new condition');
      incAndTest([1, 0, 0], 'new block');
      incAndTest([1, 0, 0], 'new trial');
      incAndTest([1, 0, 1], 'next trial');
      incAndTest([1, 0, 2]);
      incAndTest([1, 1, 0], 'new block');
      incAndTest([1, 1, 0]);
      incAndTest([1, 1, 1]);
      incAndTest([1, 1, 2]);
      incAndTest([2, 0, 0], 'new condition');
      incAndTest([2, 0, 0], 'first after condition');
      incAndTest([2, 0, 0], 'first trial after condition');
      module("Testing the end of the experiment");
      incAndTest([0, 0, 0], 'reset since we reach the end');
      incAndTest([0, 0, 0], 'no change since we reach the end');
      view.trigger("runner:sectionBegin");
      view.trigger("runner:sectionEnd");
      return incAndTest([0, 0, 0], 'view should ignore events after we reached end');
    });
  })();

}).call(this);
