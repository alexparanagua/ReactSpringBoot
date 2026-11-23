### subir banco
docker compose up -d
### derrubar
docker compose down
### verificar porta banco
sudo lsof -i :5432
### derrubar porta
sudo kill \<PID\>