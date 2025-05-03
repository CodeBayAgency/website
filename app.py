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
    return render_template('index.html')

# Mobile App Development Service


@app.route('/services/software-testing')
def mobile_app_development():
    """Mobile app development service page"""
    return render_template('mobile_app_development.html')

# E-commerce Solutions Service


@app.route('/services/ecommerce-solutions')
def ecommerce_solutions():
    """E-commerce solutions service page"""
    return render_template('ecommerce_solutions.html')

# Digital Marketing Service


@app.route('/services/digital-marketing')
def digital_marketing():
    """Digital marketing service page"""
    return render_template('digital_marketing.html')

# Custom Software Development Service


@app.route('/services/custom-software')
def custom_software():
    """Custom software development service page"""
    return render_template('custom_software.html')

# IT Consulting Service


@app.route('/services/it-consulting')
def it_consulting():
    """IT consulting service page"""
    return render_template('it_consulting.html')

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
        elif 'software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif 'ecommerce-solutions' in referrer:
            return redirect(url_for('ecommerce_solutions', _anchor='contact'))
        elif 'digital-marketing' in referrer:
            return redirect(url_for('digital_marketing', _anchor='contact'))
        elif 'custom-software' in referrer:
            return redirect(url_for('custom_software', _anchor='contact'))
        elif 'it-consulting' in referrer:
            return redirect(url_for('it_consulting', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash('There was an error processing your request. Please try again.', 'error')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'website-building' in referrer:
            return redirect(url_for('website_building', _anchor='contact'))
        elif 'software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif 'ecommerce-solutions' in referrer:
            return redirect(url_for('ecommerce_solutions', _anchor='contact'))
        elif 'digital-marketing' in referrer:
            return redirect(url_for('digital_marketing', _anchor='contact'))
        elif 'custom-software' in referrer:
            return redirect(url_for('custom_software', _anchor='contact'))
        elif 'it-consulting' in referrer:
            return redirect(url_for('it_consulting', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
