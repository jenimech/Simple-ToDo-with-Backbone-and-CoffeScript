(($) ->
  # model
  Item = Backbone.Model.extend
    defaults: name: "<b style='color:red;'>Empty name</b>"
  # /model


  # colection
  Items = Backbone.Collection.extend
    model: Item
  # /colection  


  # Item View
  ItemView = Backbone.View.extend
    events:
      "click a.remove" : 'unrender'
    initialize: ->
      _.bindAll(@, 'render', 'unrender', 'remove')
      @model.bind('remove', 'unrender')
    render: ->
      $(@el).html "<span>" + @model.get('name') + "</span><a href='#' class='remove'>[delete]</a>"
      return @
    unrender: ->
      $(@el).remove()
    remove: ->
      @model.destroy()
  # /Item View


  # List view
  ViewList = Backbone.View.extend
    el: $('body')
    events:
      "keypress #new-todo" : "addItem"
    initialize: ->
      _.bindAll(@, 'render', 'addItem', 'appendItem')
      @collection = new Items()
      @collection.bind('add', @appendItem)
      @render()
    render: ->
      $(@el).append "<h2>ToDo</h2>"
      $(@el).append "<input id='new-todo' placeholder='What needs to be done?'' type='text' />"
      $(@el).append "<ul></ul>"
      _(@collection.models).each((item) ->
        appendItem(item)
      @)
    addItem: (e) ->
      return if e.keyCode != 13
      item = new Item()
      task_name = $('input#new-todo')[0].value
      task_name = item.get('name') if task_name == ''
      item.set name: task_name
      $('input#new-todo')[0].value = ''
      @collection.add(item)
    appendItem: (item) ->
      itemView = new ItemView(model: item)
      $('ul', @el).append(itemView.render().el)
  # /List View


  viewList = new ViewList()

)($)