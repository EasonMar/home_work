xtag.register('x-praise', {
    content: `<div class="hand" id="thumb">
                <span class="now_count"></span>
              </div>
              <span class="hide" id="animation">+1</span>`,
    lifecycle: {
        created: function () { console.log('create')},
        inserted: function () { console.log('insert')},
        removed: function () { console.log('remove')},
        attributeChanged: function () { console.log('attr change')}
    },
    methods: {
        someMethod: function (evtype) { 
            console.log(`${evtype} trigger some method`);
        }
    },
    accessors: {
        someAccessor: {
            // links to the 'some-accessor' attribute
            attribute: {},
            set: function () { },
            get: function () { }
        }
    },
    events: {
        tap: function () { 
            this.someMethod('tap');
        },
        focus: function () { 
            this.someMethod('focus');
        }
    }
});