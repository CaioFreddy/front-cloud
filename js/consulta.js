/*var respostaDoServidor = '{"id":null,"hora":null,"data":null,"total":55.255,"desconto":null,"idAtendente":null,"itens":[{"id":1,"nome":"Batata","validade":"19/12/3500","quantidade":0.95,"preco":10.2,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Trident","validade":"19/12/3500","quantidade":1,"preco":10.5,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Arroz","validade":"19/12/3500","quantidade":1,"preco":3.59,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Feijão","validade":"19/12/3500","quantidade":5,"preco":2.5,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Macarrão","validade":"19/12/3500","quantidade":2.5,"preco":7.59,"setor":"Alimentício","promocao":true}]}';*/


var respostaDoServidor = '{"id":null,"hora":null,"data":null,"total":55.255,"desconto":null,"idAtendente":null,"itens":[{"id":1,"nome":"Batata","validade":"19/12/3500","quantidade":0.95,"preco":10.2,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Trident","validade":"19/12/3500","quantidade":1,"preco":10.5,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Arroz","validade":"19/12/3500","quantidade":1,"preco":3.59,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Feijão","validade":"19/12/3500","quantidade":5,"preco":2.5,"setor":"Alimentício","promocao":true},{"id":1,"nome":"Macarrão","validade":"19/12/3500","quantidade":2.5,"preco":7.59,"setor":"Alimentício","promocao":true}]}';

/*Neste exemplo, iremos simular a resposta de uma requsição de um servidor (AJAX)
	Dependendo do método, o nosso objeto já chega pronto, neste caso, iremos simular ele chegando como string*/

(function(){
	//opcional
	if(typeof respostaDoServidor === "string"){
		var dadosDaCompra = JSON.parse(respostaDoServidor);	
	}else if(typeof respostaDoServidor === "object"){
		var dadosDaCompra = respostaDoServidor;  	
	}else {
		alert("Dados Inválidos!");
	}

	console.log(dadosDaCompra);

	document.getElementById("total").innerHTML = dadosDaCompra.total;
	document.getElementById("itens-comprados").innerHTML = dadosDaCompra.itens.length;

	for (i = 0; i < dadosDaCompra.itens.length; i++){
		document.getElementById("lista-de-itens").innerHTML += '<li>Nome:' + dadosDaCompra.itens[i].nome +' || Qtdade: ' + dadosDaCompra.itens[i].quantidade +' || Preço: R$ '+ dadosDaCompra.itens[i].preco + '</li>';
	}
})();

//Mais performático pois armazena o tamanho em uma variável
// var qtdeItens = dadosDaCompra.itens.length;
// for (i = 0; i < qtdeItens; i++){
// 	document.getElementById("lista-de-itens").innerHTML += '<li>Nome:' + dadosDaCompra.itens[i].nome +' || Qtdade: ' + dadosDaCompra.itens[i].quantidade +' || Preço: R$ '+ dadosDaCompra.itens[i].preco + '</li>';
// }

