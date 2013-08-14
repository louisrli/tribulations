###*
 * @classdesc A class for running through different, nested sections for a test,
 * automatically handling transitions between the section. 
 * For example: a test can have many conditions, each of which has blocks,
 * each of which has trials.
 * 
 * @constructor
###
Tribulations = ((($, _, Backbone, Marionette) ->
  module = {}
  class module.ExperimentRunnerView extends Backbone.Marionette.Layout
    initialize: ->
      # Validate the options
      for attr in ["experimentStructure", "subviewClasses", "regionElement", "template"]
        if not @options[attr]
          console.error("Test runner was initialized without options.#{attr}.")

      # Initialize the DOM parts (template / region)
      @template = @options.template
      @addRegion("experimentRegion", this.options.regionElement)
      
      # Initialize variables related to "state", an array
      # representing the index of the current sections
      @currentState = (0 for s in @options.subviewClasses)  # determine depth through number of subviews
      @currentDepth = 0
      @maxDepth = @options.subviewClasses.length - 1
      @experimentStructure = @options.experimentStructure

      @currentView = null
      @experimentFinished = false

      # Event handlers for beginning and ending a section
      @on("runner:sectionBegin", @sectionBegin)
      @on("runner:sectionEnd", @sectionEnd)

    onRender: ->
      @trigger("runner:sectionBegin")
    
    sectionBegin: ->
      if @experimentFinished
        console.error "Received a sectionBegin event after experiment finished"
        return

      # Display the correct section for the current indices
      # and bind to the events from the subview
      stateWithDepth = _.take(@currentState, @currentDepth + 1)
      currentNode = @experimentStructure.getChildAtCoord(stateWithDepth)
      ViewClass = @options.subviewClasses[@currentDepth]

      # Convert the actual model to a Backbone model if needed
      rawModel = currentNode.get("innerModel")


      m = if rawModel instanceof Backbone.Model
        rawModel
      else
        new Backbone.Model(rawModel)

      # Initialize the view class and pass the model down
      newView = new ViewClass(model: m, state: @currentState)
      @listenTo(newView, "runner:sectionEnd", -> @trigger("runner:sectionEnd"))

      @experimentRegion.show(newView)

    sectionEnd: ->
      if @experimentFinished
        console.error "Received a sectionEnd event after experiment finished"
        return

      if @currentDepth != @maxDepth
        @currentDepth++
      else
        while @currentDepth >= 0
          # Easy case: it's not the last child, so we increment it
          if not @_isLastChild(@experimentStructure, @currentState, @currentDepth)
            @currentState[@currentDepth]++
            break
          else
            @currentState[@currentDepth] = 0
            @currentDepth--

      # currentDepth being 1 is the same as every index being on the
      # last possible value -- i.e. the experiment ended
      if @currentDepth == -1
        @experimentFinished = true
        @trigger("runner:experimentEnd")
      else
        @trigger("runner:sectionBegin")

    _isLastChild: (tree, state, depth) ->
      coords = _.take(state, (depth + 1) - 1)  # To be clear that `depth` starts at 0
      numChildren = tree.getChildrenAtCoord(coords).length
      return state[depth] == numChildren - 1

  class module.NodeModel extends Backbone.Model
    defaults: ->  # As a function, so we get a new array each time
      children: new Array()
      innerModel: null

    numChildren: -> return @get("children").length

    getChild: (i) -> return @get("children")[i]

    getChildAtCoord: (coords) ->
      child = this
      for i in coords
        child = child.getChild(i)
      child

    getChildrenAtCoord: (coords) ->
      child = this
      for i in coords
        child = child.getChild(i)
      child.get("children")

  return module
)(jQuery, _, Backbone, Marionette))
