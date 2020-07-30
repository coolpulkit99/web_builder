
var editor = grapesjs.init({
    container: '#gjs',
    storageManager: false,
    components: '<div class="txt-red">Hello world!</div>',
    style: '.txt-red{color: red}',
    blockManager: {

        appendTo: '#blocks',
        blocks: [
            {
                id: 'section', // id is mandatory
                label: '<b>Section</b>', // You can use HTML/SVG inside labels
                select: true,
                attributes: { class: 'gjs-block-section' },
                content:
                    `<section>
                        <h1>This is a simple title</h1>
                        <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                    </section>`,
            }, {
                id: 'text',
                label: 'Text',
                select: true,
                content: '<div data-gjs-type="text">Insert your text here</div>',
            }, {
                id: 'image',
                label: 'Image',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: { type: 'image' },
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
            }
        ]
    },

    storageManager: {
        type: 'remote',

        // stepsBeforeSave: 3,
        autosave: false,

        autoload: false,
        urlStore: window.location.protocol + "//" + window.location.host + "/submitmongo",
        //+'http://localhost:3000/submitmongo',
        // urlLoad: 'http://endpoint/load-template/some-id-123',
    },

});



editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
        {
            id: 'save-data',
            className: 'btn-save-json',
            label: 'Save',
            context: 'save-json',
            command(editor) {
                editor.store(res => console.log("Saved from panel"));
                alert("Saved");
            },
        },
        {
            id: 'sitemap-view',
            className: 'btn-sitemap',
            label: 'Sitemap',
            context: 'sitemap-view',
            command(editor) {
                window.location.href = window.location.protocol + "//" + window.location.host + "/showSaved";
            },
        },
    ],
});



function saveData() {
    // editor.store(res => console.log('Saved'));
    console.log(editor.Panels.getPanels());
}