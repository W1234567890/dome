<template>
	<div id="lazy">
		<header class="header" ref="header">
			<a class="header_link"></a>
			<h1 class="header_text">Lazy(懒加载)</h1>
		</header>
		<div class="header_dg"></div>
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-slide>
				<ul class="lazy_list clearfix">
					<li v-for="(item,key) in img" v-if="key < page">
						<div class="lazy_list_img"><img src="" :data-lazy="item.src" class="lazyImg"/></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data() {
		return {
			img: [{
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6598/317/1345007198/161397/c36eb9c4/59506743Ne1620718.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6703/150/1016876946/283686/c5e0fec1/59493184Ne22b16a7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6481/76/620698107/48859/85708bb7/594267cfNaac9d002.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t2620/94/79059122/288565/9768895e/56feb9a9N5983880a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4558/153/4115951695/231426/98b73609/5909ec5fN2f7368df.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6193/211/1866252426/70973/59d86772/595918bcN4bb402b5.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5836/194/4215586247/116516/71f0011d/5948f815N5d1c6109.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6745/141/1012953664/121576/25baf837/59499e6cN9aa39d74.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6499/193/1050033996/200708/24132421/594936f9N3fbade16.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6457/256/1029186581/298306/aab50e4b/5949346fNf5d21136.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6640/56/1489656724/118832/8e891ac4/5952f392N4609b1af.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5839/247/3217119053/248383/d91995b7/5938bb8eN63488fa3.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4741/42/1662731194/437352/113955fc/58f36e7bNd51628f3.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4702/45/1286607126/107731/26785477/58db19efN36c8e86f.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6073/332/971713938/280921/62d25b57/592ee9a2N8f068c7d.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5233/328/2556519846/242861/e6cb268f/591becb8Na76109af.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6109/36/2932616359/261431/35766998/59495d09N3cb3ab1a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3241/265/7480621721/318669/e48745d8/58b71065N433d6b99.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5104/210/719614577/221353/faafb9c9/5905a840Nb51a617a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6040/230/3473877387/320076/ddfe4983/5953b246Nf467c63b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5044/167/2284011525/176706/5af15da6/58fbf747N2d6205ca.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5902/230/3061120625/81730/abc50164/5949361aN494083f7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5758/302/1975116768/339669/3e7b687a/592c3360Nc95441b8.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6742/141/1043401916/310861/95d87b14/5949cbfcN66906067.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5860/86/4523863135/155007/adb049d/594fa0f4N74cad554.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6238/318/967077863/341619/e6be272d/594890d1N632f835b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5932/195/629558092/330570/277d707e/5929712fN7a18ce29.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4516/138/2935558115/253729/6231457a/58f4d82bNd50a4d1c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5926/291/1061174010/487150/fc8d244e/592e91f8N0a218142.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6478/319/997981106/335983/d7e73172/59493520N1d9c9ee4.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5755/66/407376974/373574/49a337e2/591f12b3Nab8b4649.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5134/323/1658844524/266690/4e87f6d8/591331adNfa0eb9b1.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5275/100/2539424441/276739/35483b05/591c7df2N2cfb69e7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5320/39/2138378784/468669/db732e99/59196675N5ad706d1.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5821/271/662815191/107822/21a7012e/592107d6Nfb2e2ceb.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5854/98/1497092033/401919/1505d4a8/5926f4fbN4c47c29a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5143/12/243673745/162558/332e5d48/58fb8cd7N57f77fae.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4453/161/3272500404/285670/ae4d42ab/58f8d2eaN68272557.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5794/311/3345591927/169427/82dac5f8/593a95e2Nc0112124.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5776/119/4144048291/292353/590c42a3/59492cbcN927d2b65.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4315/119/3768802427/183174/23ea0976/58e7a970N8b69a36f.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5833/12/3309421564/545787/3f6499cc/59398f4dN6169466c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6097/345/2978570487/197721/d14c52a8/5949d9e1Ncd15977b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6649/310/1491250369/248157/b19da5b/5953080eN36213124.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5605/348/152592393/572480/f26bc727/591d87c3N6977caea.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4666/214/2353468400/407315/698dfe72/58ee0a1aN9ad73d68.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5737/167/5137061731/172767/85d45f51/595a0aafNab6613cf.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6559/277/1036102341/259338/389aa6a8/5949364eN6779c826.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6742/189/1461334672/222875/c2dd8065/59521662Nf25a5a69.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4330/201/617004203/240557/c07974d9/58b6e2f3N68dae165.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5314/155/1075040070/316022/cffe1181/590b3265N705b393a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6601/40/1115763538/160752/cefed952/594b6685Nc517f6d0.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5248/15/222105894/171825/b172449a/58fb0c43N440e4091.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4879/24/2568934659/238875/5fcb90ea/59019522Nc9e8fecf.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5716/102/2494207372/344832/edf96b13/59311c3eN2d98522c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6304/119/1004220189/208279/dcb89dfa/594939d6Na62fb9d5.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6427/268/1537267198/234717/fe049923/59531dc8N65360d9e.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5500/95/1497378168/235151/3b192161/59115f31Nb3300c8c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5317/88/1765814879/75148/1cc2f3cc/5913f8bfN25a3389c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6340/198/1078157490/328047/8895e45f/594a6c1aNa1fb66c7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5977/346/3847626691/147665/c523c799/59588debNa40af780.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5539/321/732923985/380390/b7ad12b1/5905982eN5b6f7d11.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6049/11/1065082556/336816/b151909c/592fbaeaNcef834b8.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5302/47/617227105/332339/9e0554ed/590350beN72bb3eae.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4324/133/2445534171/398274/71526bfd/58d11de8N9e903046.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4495/337/4355112585/889196/c3de5504/590df39eN8b46d719.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4573/20/2111109514/358851/9bc73988/58eb1751N98a5b7d7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4789/40/750972472/302585/5519dfac/58e7503fN2513f819.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4459/211/3373885511/205939/141f41a5/58fbd6deNbc0e6848.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6058/313/2346565892/300065/720e6cc1/593fd042N35e42bf3.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6043/4/2664483972/293142/4dbd125b/5949cffdNcf4ad459.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5197/346/2310434932/218786/1cf60851/591991f6Nde055ed7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5986/52/3076144824/502313/593840e6/5949d101N0e01244b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4594/69/3608717750/175652/6f2fc159/5902cf14N9c476041.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3238/156/6620707334/240192/5e2e146c/58a8690aN578ff52a.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4615/67/1857687579/334722/f39d3d8b/58e74800N745e4eab.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4543/128/4456271038/409091/fc8521aa/590eec3fN969a21fe.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4471/19/3469442895/115219/18fc5dfe/58fe20d2N2927ebb6.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4324/47/2430487471/88129/75820545/58d07f51N89218bae.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5896/84/3516867046/439500/57ef48f2/593e89a6Nda5ca406.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6046/287/367148177/166839/f59f4a00/5928301dN8b098093.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6466/1/884729010/252728/a50c1ee4/594725e6N4749e371.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6091/68/3486443020/125729/5231edfd/595359d8Nebc0a07b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5938/291/3925576564/227072/5136f721/595a1b1fN0d4bebd4.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5605/348/152592393/572480/f26bc727/591d87c3N6977caea.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3259/364/9211089534/275170/d07321c6/58cf352eNdf5d9388.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4555/84/1302554266/253539/d8487f2d/58dbabfeNdaacb508.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4027/237/180079084/109576/dbb97025/58aef0fdN483a73d8.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3199/69/6949442938/157898/eeb4f51c/58afbb04Nacc20987.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6580/322/1017746880/272671/301f8e5d/594952fcNa42cbd94.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5827/154/4953389627/110785/482d403c/59566848Nc90ef109.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6400/53/972417422/201617/349e522d/59489134N225d330e.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6721/356/1552521112/360237/b52186fe/5953ca93N092c0536.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5362/37/916780748/262189/23382c82/59088d45N38069b45.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6031/18/755704855/115422/28b73b68/592c252fN35406766.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4201/339/490996368/96790/e8dcc57b/58b54df0N9fb42590.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4495/31/3972176653/65210/84b90493/59088136N0826aaeb.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3895/109/1602459291/143935/4fd89195/587f79f1N001f150b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6163/192/727783722/359611/ad94faff/59448ebeN821b41ba.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5176/25/1172810932/100890/83179b83/590c8679N6eb4ef89.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5476/346/2295269179/94359/8b9a33c3/59199774N28bfc8b2.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5086/82/1460613329/438941/c4873613/59109544N23dd8afe.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5881/259/4168841845/439500/57ef48f2/5949bcc6N481b1ad4.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4189/66/3529408410/132237/a1619b58/58e35002N6a940638.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5326/238/956146592/450213/243e8f52/5909d66cN0567de52.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6358/143/388881460/324472/e98c6151/593e9a31N358b1f07.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5815/114/4501453670/139865/8b6486ac/595067a8N94f89c3b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5605/44/2845263358/180771/5a8891bf/5934eed1Nba39dee7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5320/252/2161583811/92694/26f3c08e/59199778N6145812f.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3139/311/7303580080/120028/582885cc/58b4ef47N7b6e3af7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5230/175/278315375/71372/da0c2fd8/58fc5cfaN78cb257f.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4525/20/3281431867/242753/6a620a0b/5921aff3N4621dd90.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6640/363/385277386/404017/8d915110/593e8a9eN4b0e9a40.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6259/221/8114380/405149/9617d5fb/5937b72bN0f446cf7.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6055/171/2920297713/223829/fcc9c1a/59495dabN77e08526.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6076/338/2918407310/377797/42461ca1/59494b93N1d786f81.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t2704/79/664082202/141419/7a8b06c/57208c9eN98c5c73c.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5839/222/2341464315/217787/88185fd7/592fe1dbN7f8e557e.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6049/8/112198849/347611/4c94b906/5925cc26N8a4105ec.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5182/290/74847998/78185/15a35259/58f82c00N149c246d.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t3217/57/5821956418/423133/ef0e31b7/588045b6N4acd1669.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5215/105/504808136/363956/a14d6a81/590141c8Nb435e614.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6073/6/1607883707/287797/cbc1422a/5934ef9fN39e084ea.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5218/329/678896005/382878/ae562452/5904a72eNf8864eee.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t4111/41/2061686283/70064/e71dd510/58a1218eNfe4fd19b.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5299/357/1159337003/261221/82a9f2d6/590c79dbN1bfc6e0d.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t6523/133/906109933/465151/8ffeabc6/59476084N1ad57bac.jpg!cc_357x458!q50.jpg"
			}, {
				"src": "https://m.360buyimg.com/mobilecms/s357x458_jfs/t5893/4/4238344339/270059/9c228a1f/59495dd2N8651de90.jpg!cc_357x458!q50.jpg"
			}],
			page: 10,
			pageMax: 0,
			isMaxPage: false,
			scrollTop: true,
		}
	},
	computed: {
		...mapGetters([

		]),
	},
	mounted() {
		let main = this.$refs.slidesClassMain,
			header = this.$refs.header.clientHeight;
		main.style.height = window.innerHeight - main.offsetTop +'px';
		this.pageMax = this.img.length;
    },
	methods: {
		ResetTop(callback){
	        callback()
	        this.page = 10;
		},
		ResetBottom( callback){
			if(this.pageMax >= this.page){
				this.page += 10;
				callback();
			}else{
				this.isMaxPage = true;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.lazy_list{
	li{
		width: 50%;
		float: left;
		padding: .2rem;
		.lazy_list_img{
			height: 4.3rem;
			overflow: hidden;
		}
	}
}
.header_dg{
	height: 44px;
}
.header{
	top: 0;
	display: block;
    -webkit-box-shadow: 0 1px 6px #ccc;
    box-shadow: 0 1px 6px #ccc;
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    height: 44px;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 0;
    background-color: #f7f7f7;
    -webkit-box-shadow: 0 0 1px rgba(0,0,0,.85);
    box-shadow: 0 0 1px rgba(0,0,0,.85);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    font-size: 17px;
    line-height: 21px;
    color: #000;
    background-color: #efeff4;
    a{
	    padding: 15px 10px;
	    font-size: 24px;
	    position: absolute;
	    left: 0;
	    z-index: 20;
	    font-family: Muiicons;
	    font-size: 24px;
	    font-weight: 400;
	    font-style: normal;
	    line-height: 1;
	    display: inline-block;
	    text-decoration: none;
	    -webkit-font-smoothing: antialiased;
	    float: left;
	    color: #007aff;
	    background: 0 0;
	    outline: 0;
    }
    a:after{
    	content:"\e608";
    	display: block;
		font-family: iconfont!important;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	    transform: rotate(180deg);
	    -webkit-transform: rotate(180deg);
	    font-size: 14px;
	    font-weight: bold;
    }
    h1{
	    display: inline-block;
	    overflow: hidden;
	    width: auto;
	    margin: 0;
	    text-overflow: ellipsis;
	    font-size: 17px;
	    font-weight: 500;
	    line-height: 44px;
	    position: absolute;
	    width: 100%;
	    padding: 0;
	    text-align: center;
	    white-space: nowrap;
	    color: #000;
	    left: 0;
    }
}
</style>
<style type="text/css">
.lazy_position{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
</style>