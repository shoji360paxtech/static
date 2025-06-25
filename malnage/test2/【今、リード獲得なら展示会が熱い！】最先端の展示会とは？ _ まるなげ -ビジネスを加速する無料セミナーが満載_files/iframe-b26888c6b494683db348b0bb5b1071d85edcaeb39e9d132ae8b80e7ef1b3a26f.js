// サイドレイアウトには2種類のUIがあり、
// - iframeの幅が554未満の場合はフォームカバーが項目の上になる、(SP)
// - それ以外の場合は左側になる、(PC)
var horizontalLayoutPcMinWidth = 554;
// TODO: このスクリプト、グローバルに露出しているので、変数名・関数名がバッティングすると困る



// iframe埋め込み利用時の高さを親ページに送信
var windowHeight = null;

function postSize(event){
    var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

    if (typeof target !== "undefined") {
        var vueData = document.getElementById('vue-data');
        if (vueData === null) {
            return;
        }

        var jsonData = JSON.parse(vueData.getAttribute('data-admin-data'));
        var heightElement = getHeightElement(jsonData.layout_type);
        if(heightElement === null) {
            return;
        }

        if (windowHeight !== heightElement.scrollHeight) {
            if (vueData) {
              windowHeight = heightElement.scrollHeight;
              var meg = { height: windowHeight, friendlyKey: jsonData.friendly_key };
              target.postMessage(JSON.stringify(meg), '*');
            }
        }

        if (!isDirectEmbedded()) {
            // embed.js で iframe の高さを自動調整しているが、条件によっては高さが合わずスクロールできてしまう
            // 特にモバイル環境だと微妙な iframe 内部のスクロールが、ページスクロール時のひっかかりになり体験が悪い
            // そのため iframe 内部のスクロールを強制的に禁止するようにしている
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
        }
    }
}

/**
 * embed.js を使わないで直接 iframe 埋め込みをしているかの判断
 *
 * 直接埋め込んでいることをシステムが知るために URL にクエリストリングを付けてもらう
 * e.g. https://form.run/embed/@xxx?embed=direct
 * 当然、クエリストリングが付いているかどうかは設置するユーザ次第なので確実性はない
 *
 * @returns {boolean}
 */
function isDirectEmbedded() {
    var params = document.location.search.substring(1);
    return params.includes('embed=direct');
}

// フルスクリーン,サイド表示,トップ表示の時で高さを取得するEelementを分ける
function getHeightElement(layoutType){
    if (layoutType === 'layout-vertical') {
        return document.querySelector('.vertical-body');
    } else if (layoutType === 'layout-fullscreen') {
        return document.querySelector('.fullscreen-body');
    } else if (layoutType === 'layout-horizontal') {
        // サイドレイアウトには2種類のUIがあり、
        // - iframeの幅が554未満の場合はフォームカバーが項目の上になる、
        // - それ以外の場合は左側になる、
        // -> そのため、iframeの長さを計算するときに2ケースに分ける
        return document.querySelector('#sf-form-page').scrollWidth < horizontalLayoutPcMinWidth ? document.querySelector('.horizontal-body') : document.querySelector('.sf-form-content');
    } else if (layoutType === 'layout-nocover') {
        return document.querySelector('.layout-nocover');
    }else{
        return document.querySelector('#sf-form-page');
    }
}

// フォーム送信後に親フレームのlocationを変更のオプション
window.addEventListener('message', function(event) {
    if (event.data === null || event.data.formrunRedirect !== true) {
        return;
    }

    var formEl = document.querySelector('form.js-creator-form');
    if (formEl !== null) {
        formEl.setAttribute('target', '_parent');
    }
});

window.addEventListener('load', postSize, false);

setInterval(postSize, 1000/60);
