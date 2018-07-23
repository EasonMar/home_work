'use strict';

xtag.register('x-praise', {
    content: '<div class="hand" id="thumb">\n                <span class="now_count"></span>\n              </div>\n              <span class="hide" id="animation">+1</span>',
    lifecycle: {
        created: function created() {
            console.log('create');
        },
        inserted: function inserted() {
            console.log('insert');
        },
        removed: function removed() {
            console.log('remove');
        },
        attributeChanged: function attributeChanged() {
            console.log('attr change');
        }
    },
    methods: {
        someMethod: function someMethod(evtype) {
            console.log(evtype + ' trigger some method');
        }
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
        tap: function tap() {
            this.someMethod('tap');
        },
        focus: function focus() {
            this.someMethod('focus');
        }
    }
});
