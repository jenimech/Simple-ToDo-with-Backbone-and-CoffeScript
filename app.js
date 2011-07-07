(function() {
  (function($) {
    var Item, ItemView, Items, ViewList, viewList;
    Item = Backbone.Model.extend({
      defaults: {
        name: "<b style='color:red;'>Empty name</b>"
      }
    });
    Items = Backbone.Collection.extend({
      model: Item
    });
    ItemView = Backbone.View.extend({
      events: {
        "click a.remove": 'unrender'
      },
      initialize: function() {
        _.bindAll(this, 'render', 'unrender', 'remove');
        return this.model.bind('remove', 'unrender');
      },
      render: function() {
        $(this.el).html("<span>" + this.model.get('name') + "</span><a href='#' class='remove'>[delete]</a>");
        return this;
      },
      unrender: function() {
        return $(this.el).remove();
      },
      remove: function() {
        return this.model.destroy();
      }
    });
    ViewList = Backbone.View.extend({
      el: $('body'),
      events: {
        "keypress #new-todo": "addItem"
      },
      initialize: function() {
        _.bindAll(this, 'render', 'addItem', 'appendItem');
        this.collection = new Items();
        this.collection.bind('add', this.appendItem);
        return this.render();
      },
      render: function() {
        $(this.el).append("<h2>Todo </h2>");
        $(this.el).append("<input id='new-todo' placeholder='What needs to be done?'' type='text' />");
        $(this.el).append("<ul></ul>");
        return _(this.collection.models).each(function(item) {
          return appendItem(item);
        }, this);
      },
      addItem: function(e) {
        var item, task_name;
        if (e.keyCode !== 13) {
          return;
        }
        item = new Item();
        task_name = $('input#new-todo')[0].value;
        if (task_name === '') {
          task_name = item.get('name');
        }
        item.set({
          name: task_name
        });
        $('input#new-todo')[0].value = '';
        return this.collection.add(item);
      },
      appendItem: function(item) {
        var itemView;
        itemView = new ItemView({
          model: item
        });
        return $('ul', this.el).append(itemView.render().el);
      }
    });
    return viewList = new ViewList();
  })($);
}).call(this);
