# Let the connection to db be established
sleep 10;

# Run migrations
python -m alembic revision --autogenerate -m "init session"
python -m alembic upgrade head