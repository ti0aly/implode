package main

import (
	"fmt"
	"net/http"
)

func main() {

    fs := http.FileServer(http.Dir("./"))
	http.Handle("/", fs)


	// Configura o servidor para escutar na porta 8080
    fmt.Println("Servidor escutando na porta 8080...")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Println("Erro ao iniciar o servidor:", err)
 	}
}