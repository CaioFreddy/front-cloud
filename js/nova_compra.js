/*Modelo de saída:
<tr>
	<td>1.</td>
	<td>Leite em pó Molico 500g</td>
	<td>2</td>
	<td>R$ 7,50</td>
</tr>
*/
var contItem = 0;
var total = 0;
var totalParaExibir = "";

//construindo objeto para armazenamentos de propriedades da minha compra
var objCompra = {
	id: null,
	hora: null,
	data: null,
	cpf: null,
	total: null,
	desconto: null,
	idAtendente: null,
	itens: [
		//{
		// id : null,
		// nome : null,
		// validade : null,
		// quantidade : null,
		// preco : null,
		// setor : null,
		// promocao : null //boleano

		//},
	]
}

function adicionaProduto() {

	var item = {
		id: 1,
		nome: document.getElementById("nome-produto").value,
		validade: '19/12/3500',
		quantidade: Number(document.getElementById("quantidade-produto").value),
		preco: Number(document.getElementById("preco-produto").value),
		setor: 'Alimentício',
		promocao: true
	}

	if (!item.nome || !item.quantidade || item.quantidade < 0.000001 || !item.preco) {
		alert("Preencha os campos corretamente!")
		return;
	};

	objCompra.total += item.quantidade * item.preco;
	objCompra.cpf = document.getElementById("edtCPF").value;
	var data = new Date();
	var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
	var horaFormatada = ("0" + data.getHours()).substr(-2) + ":" + ("0" + (data.getMinutes() + 1)).substr(-2) + ":" + data.getSeconds();
	objCompra.data = dataFormatada;
	objCompra.hora = horaFormatada;

	//variáveis para mostrar conteúdo amigável para usuário
	var precoParaExibir = item.preco.toFixed(2).replace(".", ",");
	var quantidadeParaExibir = item.quantidade.toFixed(3).replace(".", ",");// Arredondando quantidades para não estourar a tabela
	var totalParaExibir = objCompra.total.toFixed(2).replace(".", ",");//toFixed retorna uma string. replace troca o ponto para virgula

	objCompra.itens.push(item);
	document.getElementById("conteudo-nota").innerHTML +=
		"<tr id='trItem" + objCompra.itens.length + "' data-item='" + objCompra.itens.length + "'>" +
		" <td>" + (objCompra.itens.length) + "</td>" +
		" <td>" + item.nome + "</td><td>" + quantidadeParaExibir + "</td> " +
		" <td> R$" + precoParaExibir + "</td> " +
		" <td><button id='btn" + objCompra.itens.length + "'>Deletar</button></td> " +
		" </tr>";

	document.getElementById("total-parcial").innerHTML = "R$" + totalParaExibir;
	document.getElementById("CPFInfo").innerHTML = "CPF: " + objCompra.cpf;

	$('tr').find("button").unbind();
	$('tr').find("button").on("click", removeItem);

	limpaInputs();

	function removeItem(e) {
		var $tr = $(this).parent().parent();
		var itemToDelete = $tr.data("item");
		$tr.remove();
		delete objCompra.itens[itemToDelete];
		console.log(objCompra);
	}
}

function limpaInputs() {
	document.getElementById("nome-produto").value = null;
	document.getElementById("quantidade-produto").value = null;
	document.getElementById("preco-produto").value = null;
}

function finalizar() {

	/*
var data = JSON.stringify(objCompra);
alert(data);
*/

	if (!objCompra.itens.length) {
		alert("Você não inseriu nenhum item!");
		return;
	}

	if (objCompra.cpf == null || objCompra.cpf == '') {
		if (!confirm("CPF em branco, deseja finalizar a compra?"))
			return;
	}
	else if (!confirm("Você realmente deseja finalizar a compra?")) {
		return;
	}
	document.getElementById("conteudoTotal").innerHTML += '<tr class="total"><td colspan="3">Total: </td><td id= "total">R$' + objCompra.total.toFixed(2).replace(".", ",") + '</td></tr>'
	document.getElementsByClassName("inputs")[0].style.display = "none";

	console.log(objCompra);
	console.log(JSON.stringify(objCompra));//transforma um objeto em string, para add no BD

	var xhr = new XMLHttpRequest();
	var url = "http://trabalhocloud-env-1.eba-cnimrayy.us-east-1.elasticbeanstalk.com/incluir";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Accept", "*/*");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

	xhr.onload = function () {
		if (xhr.status == 200) {
			alert("Compra realizada com sucesso!");
			window.location.href = 'http://front-49bdt.s3-website-us-east-1.amazonaws.com/';
		}
		else {
			console.log(xhr)
			alert("Erro de comunicação com o servidor! Por favor, tente novamente!")
		}
	};

	var data = JSON.stringify(objCompra);

	xhr.send(data);
}