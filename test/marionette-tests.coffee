((->
  App = new Backbone.Marionette.Application()
  App.addRegions(
    mainRegion: "#main-region"
  )


  Blocks =
    baz: [
      [1, 2, 3],
      [0]
    ]
    foo: [
      [6, 7, 8],
      [9, 1, 2]
    ]
    bar: [
      [1]
    ]
   
  App.loadExperimentData = ->
    mainTest = new Tribulations.NodeModel

    for k, v of Blocks
      realityNode = new Tribulations.NodeModel({ innerModel: { name: k } })
      realityChildren = []
      for block in v
        blockNode = new Tribulations.NodeModel(
          children: (new Tribulations.NodeModel({ innerModel: { number: t } }) for t in block)
        )
        realityChildren.push(blockNode)
      realityNode.set("children", realityChildren)
      mainTest.get("children").push(realityNode)
    return mainTest

  class ConditionSectionView extends Marionette.ItemView
    template: "#condition-template"

  class BlockSectionView extends Marionette.ItemView
    template: "#block-template"

  class TrialSectionView extends Marionette.ItemView
    template: "#trial-template"

  view = new Tribulations.ExperimentRunnerView({
    experimentStructure: App.loadExperimentData()
    subviewClasses: [ConditionSectionView, BlockSectionView, TrialSectionView]
    regionElement: "#experiment-region"
    template: "#runner-template"
  })

  ###
  # Begin tests
  ###
  deq = deepEqual
  inc = -> view.trigger("runner:sectionEnd")
  incAndTest = (expectedState, message, callback) ->
    inc()
    deq(view.currentState, expectedState)
    if callback
      callback()

  test('Initial state', ->
    deq(view.currentState, [0, 0, 0], 'Initial state should be 0,0,0')
  )

  test('Max depth correct', ->
    deq(view.maxDepth, 2, 'Max depth should be 2 for our test case, since we
    have three view subclasses')
    )

  test('increment', ->
    module("Initial state")

    inc()
    deq(view.currentState, [0, 0, 0], 'Incrementing should only increase depth (0)')
    deq(view.currentDepth, 1, 'Incrementing should increase depth')

    inc()
    deq(view.currentState, [0, 0, 0], 'Incrementing should only increase depth (1)')
    deq(view.currentDepth, 2, 'Incrementing should increase depth')
    ok(view.currentDepth == view.maxDepth, 'We should be at the max depth')

    # Test that information is passed to the view correctly
    module("Testing progression through the tree")
    incAndTest([0, 0, 1])
    incAndTest([0, 0, 2])
    incAndTest([0, 1, 0], 'new block')
    incAndTest([0, 1, 0], 'new trial after block')

    incAndTest([1, 0, 0], 'new condition')
    incAndTest([1, 0, 0], 'new block')
    incAndTest([1, 0, 0], 'new trial')
    incAndTest([1, 0, 1], 'next trial')
    incAndTest([1, 0, 2])
    incAndTest([1, 1, 0], 'new block')
    incAndTest([1, 1, 0])
    incAndTest([1, 1, 1])
    incAndTest([1, 1, 2])
    incAndTest([2, 0, 0], 'new condition')
    incAndTest([2, 0, 0], 'first after condition')
    incAndTest([2, 0, 0], 'first trial after condition')

    module("Testing the end of the experiment")
    incAndTest([0, 0, 0], 'reset since we reach the end')
    incAndTest([0, 0, 0], 'no change since we reach the end')
    view.trigger("runner:sectionBegin")
    view.trigger("runner:sectionEnd")
    incAndTest([0, 0, 0], 'view should ignore events after we reached end')

  )
    

)())
