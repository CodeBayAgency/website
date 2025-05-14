import os
import logging
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Routes


@app.route('/')
def home():
    """Home page with all services"""
    return render_template('home.html')

# Website Building Service


@app.route('/services/website-building')
def website_building():
    """Website building service page"""
    return render_template('website_building.html')

# Software Testing Service


@app.route('/services/software-testing')
def software_testing():
    """Software testing service page"""
    return render_template('software_testing.html')

# AWS Architecture & Consulting Service


@app.route('/services/aws-architecture-consulting')
def aws_architecture_consulting():
    """AWS architecture & consulting service page"""
    return render_template('aws_architecture_consulting.html')

# AI Solutions Service


@app.route('/services/ai-solutions')
def ai_solutions():
    """AI solutions service page"""
    return render_template('ai_solutions.html')

# Cloud Migration to AWS Service


@app.route('/services/cloud-migration-to-aws')
def cloud_migration_to_aws():
    """Cloud migration to AWS service page"""
    return render_template('cloud_migration_to_aws.html')

# Custom Restaurant Apps Service


@app.route('/services/custom-restaurant-apps')
def custom_restaurant_apps():
    """Custom restaurant apps service page"""
    return render_template('custom_restaurant_apps.html')

# Coming Soon Page


@app.route('/coming-soon')
def coming_soon():
    """Coming soon page for services under development"""
    return render_template('coming_soon.html')


@app.route('/contact', methods=['POST'])
def contact():
    """
    Handle contact form submissions (fallback for non-JavaScript users)
    Note: Primary contact form submission is now handled by EmailJS
    """
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject', 'Contact Form Submission')
        message = request.form.get('message')

        # Log the form submission (this is a fallback in case JavaScript is disabled)
        logging.info(
            f"Server-side contact form submission: {name} ({email}): {subject} - {message}")

        # Flash a success message
        flash('Thank you for your message! We will get back to you soon.', 'success')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'website-building' in referrer:
            return redirect(url_for('website_building', _anchor='contact'))
        elif '/services/software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif '/services/aws-architecture-consulting' in referrer:
            return redirect(url_for('aws_architecture_consulting', _anchor='contact'))
        elif '/services/ai-solutions' in referrer:
            return redirect(url_for('ai_solutions', _anchor='contact'))
        elif '/services/cloud-migration-to-aws' in referrer:
            return redirect(url_for('cloud_migration_to_aws', _anchor='contact'))
        elif '/services/custom-restaurant-apps' in referrer:
            return redirect(url_for('custom_restaurant_apps', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash('There was an error processing your request. Please try again.', 'error')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'website-building' in referrer:
            return redirect(url_for('website_building', _anchor='contact'))
        elif '/services/software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif '/services/aws-architecture-consulting' in referrer:
            return redirect(url_for('aws_architecture_consulting', _anchor='contact'))
        elif '/services/ai-solutions' in referrer:
            return redirect(url_for('ai_solutions', _anchor='contact'))
        elif '/services/cloud-migration-to-aws' in referrer:
            return redirect(url_for('cloud_migration_to_aws', _anchor='contact'))
        elif '/services/custom-restaurant-apps' in referrer:
            return redirect(url_for('custom_restaurant_apps', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
