package main

import (
	"fmt"
	"net/http"
)

func main() {

    fs := http.FileServer(http.Dir("./"))
	http.Handle("/", fs)

    // Configura o servidor para escutar em todas as interfaces na porta 8080
    fmt.Println("Servidor escutando em todas as interfaces na porta 8080...")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Println("Erro ao iniciar o servidor:", err)
    }
}