window.addEventListener('load',function (){
let formrundiv=document.getElementById('formrun-embed')
let formrunifm= formrundiv.getElementsByTagName('iframe')[0]
formrundiv.insertAdjacentHTML('beforebegin','<div style="font-size:13px;width:100%;margin-bottom:10px;">マイページに<a href="https://inden-seminar.com/doc_mypage/" target="_new">ログイン</a>して情報を登録すると、メールアドレス選択で基本情報が自動で入力されます。</div><div id="malaccountdiv" style="width:100%;padding:auto;text-align:center"></div>')
fetch("https://script.googleusercontent.com/a/macros/malnage.jp/echo?user_content_key=AehSKLjXnRcwGhzwi1Ch0qN4DfF-ku776xxrYAGNDWNx4-ji26-N2K0PrtXscghc9F58vJqbyoG7rPOJpo4Laj9i2kNBumaISpOUQJnodi-wcrFrMhJImnAX8aNaMQ3JiwM8J1MFNLjFxHOQJv8vl8DP1pzqZnIn8655QC2U7b7bROPtNygv0ZSMPqCdFpoFOm3A8VYnj9bfh5k0bxy1uxO808XwuqISJJivj_KXPWKhZ5NmZPDXXH--2qONQwiWT6cvrgUKVrf1TCtle3zjyf_ZG4mBdvAZ_tlOz6M_9ssz7dfYxfUatw8&lib=MoRvMrDrtWwSQealFxIT8HKuGF7ZTdC29")
    .then(response => response.json())
    .then(
    res => {
    	console.log(res)
    	let param=''
    	let inputtag='<select id="malaccount" style="font-size:18px;color:black;height:39px;max-width:320px;width:100%;border-color:rgb(217, 217, 217)" onchange="accountchange(this)"><option value="なし">　</option>'
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
