let maluuid=localStorage.getItem('maluuid')||crypto.randomUUID();
localStorage.setItem('maluuid',maluuid);
let gaswebapp='https://script.google.com/macros/s/AKfycbxd6tVV_0Va1Pag9cu8XZak6l5PeIJT7B61t401vY_ON1-UBXflkxXN8KFCSPWW2xg_zg/exec'
window.addEventListener('load',function (){
let formrundiv=document.getElementById('formrun-embed')
let formid=formrundiv.getAttribute('data-formrun-form')
let formrunifm= formrundiv.getElementsByTagName('iframe')[0]
formrundiv.insertAdjacentHTML('beforebegin',`<div style="font-size:13px;width:100%;margin-bottom:10px;"><a href="https://inden-seminar.com/doc_mypage/" target="_new">マイページ</a>に情報を登録すると、メールアドレス選択で基本情報が自動で入力されます。</div><div id="malaccountdiv" style="width:100%;padding:auto;text-align:center"></div>`)
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
	    marign-right:15px;
            font-weight: bold;
	    font-size:100%;
	}
	.btn_myhome:hover {
	    background-color:#e0671c:important;
	}
	</style>
	<div style="position:relative;left:-15px;width:100%;text-align:right">
	<button style="" class="btn_myhome">マイページ</button></div>
     	<select id="malaccount" style="font-size:100%;color:black;height:39px;border-color:rgb(217, 217, 217)" onchange="accountchange(this)" class="select-fullwidth"></option>
       	<option value="" disabled selected style="display:none;">マイページにログインしてください</option></select>       		
	 `
    	for (key in res){
			inputtag=`${inputtag}<option value="${res[key]}">${key}</option>`
    	}
    	inputtag=`${inputtag}</select>`
		console.log(inputtag)
		document.getElementById('malaccountdiv').innerHTML=inputtag;
    }
    )
    .catch(error => console.error("Error:", error));
})

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
