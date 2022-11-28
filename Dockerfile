FROM python:3.9

WORKDIR /client

RUN pip install flask
RUN pip install gunicorn

COPY /client/server.py ./
COPY /client/wsgi.py ./
COPY winterCourses.json ./
COPY courses.json ./

EXPOSE 5000
CMD ["gunicorn", "--workers", "3", "-b", "127.0.0.1:5000", "-m", "007", "wsgi:app"]