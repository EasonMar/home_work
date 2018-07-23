'use strict';

xtag.register('x-praise', {
    content: '<div class="hand" id="thumb">\n                <span class="now_count"></span>\n              </div>\n              <span class="hide" id="animation">+1</span>',
    lifecycle: {
        created: function created() {},
        inserted: function inserted() {},
        removed: function removed() {},
        attributeChanged: function attributeChanged() {}
    },
    methods: {
        someMethod: function someMethod() {}
    },
    accessors: {
        someAccessor: {
            // links to the 'some-accessor' attribute
            attribute: {},
            set: function set() {},
            get: function get() {}
        }
    },
    events: {
        tap: function tap() {},
        focus: function focus() {}
    }
});
