migrate:
	python3 backend/manage.py makemigrations social_media_manager_AI
	python3 backend/manage.py migrate social_media_manager_AI

start-frontend:
	cd frontend
	npm run start

start-backend:
	python3 backend/manage.py runserver