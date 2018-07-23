xtag.register('x-praise', {
    content: `<div class="hand" id="thumb">
                <span class="now_count"></span>
              </div>
              <span class="hide" id="animation">+1</span>`,
    lifecycle: {
        created: function () { },
        inserted: function () { },
        removed: function () { },
        attributeChanged: function () { }
    },
    methods: {
        someMethod: function () { }
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
        tap: function () { },
        focus: function () { }
    }
});