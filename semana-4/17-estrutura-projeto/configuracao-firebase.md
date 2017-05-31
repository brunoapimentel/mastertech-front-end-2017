# Configuração Firebase para projeto MasterTrello

## Autenticação
- Acessar a seção Authentication e marcar o método 'Email/Password' como enabled

## Banco de dados
- Acessar a seção 'Rules' e definir as seguintes regras

```
{
  "rules": {
    "usuarios":{
      "$user_id":{
        ".read": "auth.uid == $user_id",
    		".write": "auth.uid == $user_id"
      }
    }
  }
}
```
