FROM python:3.7

# Will change this later, just using this for testing right now
ENV DJANGO_SECRET=qwe123qwe123
ENV OPEN5E_DEBUG=0

COPY ./server /server

COPY ./data /data

WORKDIR /server

RUN pip install pipenv && pipenv install && \
  pipenv run python manage.py migrate && \
  pipenv run python manage.py populatedb --flush /data/WOTC_5e_SRD_v5.1/

ENTRYPOINT ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
