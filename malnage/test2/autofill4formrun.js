let maluuid=localStorage.getItem('maluuid')||crypto.randomUUID();
localStorage.setItem('maluuid',maluuid);
let gaswebapp='https://script.google.com/macros/s/AKfycbxd6tVV_0Va1Pag9cu8XZak6l5PeIJT7B61t401vY_ON1-UBXflkxXN8KFCSPWW2xg_zg/exec'
window.addEventListener('load',function (){
syncFormrun()
})

function syncFormrun(){
let formrundiv=document.getElementById('formrun-embed')
let formid=formrundiv.getAttribute('data-formrun-form')
let formrunifm= formrundiv.getElementsByTagName('iframe')[0]
formrundiv.insertAdjacentHTML('beforebegin',`<div style="font-size:100%;width:100%;margin-bottom:10px;">メールアドレスが表示されていれば基本情報が自動で入力されます。「情報更新」で最新データを取得します。</div>
<div id="malaccountdiv" style="min-height:80px;display:block;width:100%;padding:auto;text-align:center"></div>`)

fetch(gaswebapp+'?action=getinfo&maluuid='+maluuid+'&formid='+formid)
    .then(response => response.json())
    .then(
    res => {
    	console.log(res)
    	let param=''
    	let inputtag=`
     	<style>.select-fullwidth {
	  width: calc(100% - 30px); /* 左右15pxずつ引く */
	  margin: 0 15px;
	  box-sizing: border-box; /* paddingやborderを含めて幅を計算 */
	}
	.btn_myhome {
	    border-radius:18px;
	    height:28px;
	    width:90px;
	    color:white;
	    background-color:#fc7830;
     	    margin-bottom:5px;
            font-weight: bold;
	    font-size:100%;
	}
	.btn_myhome:hover {
	    background-color:#e0671c:important;
	}
 	#myDialog {
	  display: none; /* 初期状態では非表示 */
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 90svh;
	  background-color: #cccccc; /* 半透明の背景 */
	  z-index: 1000; /* 他の要素より前面に表示 */
	}
	
	#myDialog[open] {
	  display: block;
	}
	
	#myIframe {
	  width: 100%;
	  height: 95%;
	  margin: 0%;
	  border: none; /* 枠線を消す */
   	  background-color: background-color: rgba(0, 0, 0, 0.5); /* 半透明の背景 */;
	}
	</style>
	<div style="position:relative;left:-15px;width:100%;text-align:right">
	<button style="" class="btn_myhome" onclick="openDialog()">情報更新</button></div>
     	<select id="malaccount" disabled style="max-width:620px;font-size:100%;color:black;height:39px;border-color:rgb(217, 217, 217)" onchange="accountchange(this)" class="select-fullwidth"></option>

       	<option value="" disabled selected style="display:none;">情報更新ボタンで最新の情報を取得</option>##inputtag##</select>       		
	<dialog id="myDialog">
 	<div style="width:100%;text-align:right;margin-right:15px;">
  	<button class="btn_myhome" onclick="closeDialog()" style="z-index:100000">閉じる</button>
   	</div>
  	<iframe id="myIframe" src="about:blank" frameborder="0"></iframe>
	</dialog>
	 `
	let options=''
    	for (key in res){
			options=`${options}<option value="${res[key]}">${key}</option>`
    	}
    	inputtag=inputtag.replace('##inputtag##',options)
		console.log(inputtag)
		document.getElementById('malaccountdiv').innerHTML=inputtag;
	if(Object.keys(res).length>0){
		document.getElementById('malaccount').selectedIndex=1;
		accountchange(document.getElementById('malaccount'))
    	}
    }
    )
    .catch(error => console.error("Error:", error));
}

function accountchange(ele){
	let formrundiv=document.getElementById('formrun-embed')
	let formrunifm= formrundiv.getElementsByTagName('iframe')[0]
	let value=ele.value
	if(ele.value=='なし') value='' 
	let query=''
	let originalurl= 'https://form.run/embed/'+formrundiv.getAttribute('data-formrun-form').replace(/^([^?]*)?/,'$1')
	if(location.search.indexOf('?')>-1) {query='&'+value} else {query='?'+value}
	console.log(originalurl+query)
	formrunifm.src=originalurl+query
}
function openDialog() {
  document.getElementById('myIframe').src='https://script.google.com/macros/s/AKfycbxd6tVV_0Va1Pag9cu8XZak6l5PeIJT7B61t401vY_ON1-UBXflkxXN8KFCSPWW2xg_zg/exec?action=datasync&maluuid='+maluuid;
  const dialog = document.getElementById('myDialog');
  dialog.setAttribute('open', '');
}

function closeDialog() {
  const dialog = document.getElementById('myDialog');
  dialog.removeAttribute('open');
  syncFormrun();
}
