#!/bin/bash
docker exec -it postgres psql -U super_user -a -f /sql/create_db.sql
