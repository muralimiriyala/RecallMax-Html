import $ from 'jquery';
const customSelectBox={
    $ele: $('select'),
    init(){
        const _=this;
        const $select = _.$ele;
        console.log($select)
        // $select.selectBox({
        //     keepInViewport: false,
        //     menuSpeed: "normal",
        //     mobile: true,
        //     hideOnWindowScroll: true,
        //     menuTransition: "slide",
        // });
        // $(".selectBox, .selectBox-dropdown .selectBox-label").removeAttr('style');
    }
}
export default customSelectBox;