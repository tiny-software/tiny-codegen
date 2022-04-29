<?php

class ProdutoView implements ShowProdutoInterface, CreateProdutoInterface, UpdateProdutoInterface, DeleteProdutoInterface {

	public function show($id) {
		return "";
	}
	public function index() {
		return "";
	}
	public function create(ProdutoDTO $produto) {
		return "";
	}
	public function update(int $id, ProdutoDTO $produto) {
		return "";
	}
	public function delete(int $id) {
		return "";
	}

}
