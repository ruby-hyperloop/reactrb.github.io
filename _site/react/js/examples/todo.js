"use strict";

var TODO_COMPONENT = "\nclass TodoList < React::Component::Base\n\n  param :items, type: [String]\n\n  def render\n    ul do\n      params.items.each_with_index do |item, index|\n        li(key: \"item - #{index}\") { item }\n      end\n    end\n  end\nend\n\nclass TodoApp < React::Component::Base\n\n  before_mount do\n    state.items! []\n    state.text! \"\"\n  end\n\n  render do\n    div do\n      h3 { \"TODO\" }\n      TodoList items: state.items\n      div do\n        input(value: state.text).on(:change) do |e|\n          state.text! e.target.value\n        end\n        button { \"Add ##{state.items.length+1}\" }.on(:click) do |e|\n          state.items! (state.items + [state.text!(\"\")])\n        end\n      end\n    end\n  end\nend\n\nElement[\"#todo-target\"].render { TodoApp() }\n";

ReactDOM.render(React.createElement(ReactPlayground, { codeText: TODO_COMPONENT, elementId: "todo-target" }), document.getElementById('todoExample'));