let maluuid=localStorage.getItem('maluuid')||crypto.randomUUID();
localStorage.setItem('maluuid',maluuid);
let gaswebapp='https://script.google.com/macros/s/AKfycbxd6tVV_0Va1Pag9cu8XZak6l5PeIJT7B61t401vY_ON1-UBXflkxXN8KFCSPWW2xg_zg/exec'
window.addEventListener('load',function (){
let formrundiv=document.getElementById('formrun-embed')
let formid=formrundiv.getAttribute('data-formrun-form')
let formrunifm= formrundiv.getElementsByTagName('iframe')[0]
formrundiv.insertAdjacentHTML('beforebegin','<div style="font-size:13px;width:100%;margin-bottom:10px;">マイページに<a href="https://inden-seminar.com/doc_mypage/" target="_new">ログイン</a>して情報を登録すると、メールアドレス選択で基本情報が自動で入力されます。</div><div id="malaccountdiv" style="width:100%;padding:auto;text-align:center"></div>')
fetch(gaswebapp+'?action=getinfo&maluuid='+maluuid+'&formid='+formid)
    .then(response => response.json())
    .then(
    res => {
    	console.log(res)
    	let param=''
    	let inputtag=`
     		<div style="width:100%;text-align:right">${(Reflect.ownKeys(ret).length.length==0)?'<button style="width:100px;">ログイン</button>':''}</div>
     		<select id="malaccount" style="font-size:18px;color:black;height:39px;max-width:320px;width:100%;border-color:rgb(217, 217, 217)" onchange="accountchange(this)"><option value="なし">　</option>
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
