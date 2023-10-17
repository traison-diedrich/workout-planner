# Let the connection to db be established
sleep 10;

# Run migrations (Migrations must be made locally before building the image)
python -m alembic upgrade head