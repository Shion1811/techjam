FROM python:3.12-slim

# Create and set work directory
WORKDIR /django/techjam_project

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt pymysql

# Copy project files
COPY . .

# Copy and set execute permission for start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run migrations and start server
CMD ["/start.sh"]