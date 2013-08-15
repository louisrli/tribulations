(function() {
    // Initialize Marionette application
    var App = new Backbone.Marionette.Application();
    App.addRegions({
        mainRegion: "#main-region"
    });

    // Create view subclasses
    var endOnClickEvents = {
        click: function() {
            // Helper: triggers an event for the end of an experimental section
            this.trigger("runner:sectionEnd"); 
        }
    };

    var ConditionView = Marionette.ItemView.extend({
        template: "#condition-template",
        events: endOnClickEvents
    });

    var BlockView = Marionette.ItemView.extend({
        template: "#block-template",
        events: endOnClickEvents
    });

    var TrialView = Marionette.ItemView.extend({
        template: "#trial-template",
        events: endOnClickEvents
    });

    var NumberTask = Backbone.Model.extend({
        initialize: function() {
            // do something interesting with this model
        }
    });

    // Define experimental structure
    var EXPERIMENT = {
        firstCondition: [
            [1, 2, 3],  // first block
            [4, 5],     // second block
            [6]        // etc.
        ],
        secondCondition: [
            [7, 8, 9],
            [8, 7]
        ]
    };

    // Create a tree from the experimental structure using Tribulations.Node
    var root = new Tribulations.NodeModel();

    // Set the children of the root node to our tree, with
    // conditions at the top level
    root.set("children", _.map(EXPERIMENT, function(value, key) {
        var conditionName = key;
        var blocks = value;
        var conditionNode = new Tribulations.NodeModel({
            innerModel: { name: conditionName }
        });

        // In each condition, create nodes for the blocks
        conditionNode.set("children", _.map(blocks, function(currentBlock) {
            var blockNode = new Tribulations.NodeModel({
                // no innerModel, since it has no metadata

                // Add each trial to the node for the current block
                children: _.map(currentBlock, function(trialDigit) {
                    return new Tribulations.NodeModel({
                        innerModel: new NumberTask({ number: trialDigit })
                    });
                })
            }); 

            return blockNode;
        }));

        return conditionNode;
    }));

    var myExperimentalStructure = root;

    var experimentRunnerView = new Tribulations.ExperimentRunnerView({
        experimentStructure: myExperimentalStructure,
        subviewClasses: [ConditionView, BlockView, TrialView],
        regionElement: "#experiment-region",
        template: "#runner-template"
    });

    experimentRunnerView.on("runner:experimentEnd", function() {
        App.mainRegion.close();
        alert("You've finished the experiment!");
    });
    App.mainRegion.show(experimentRunnerView);

})();
