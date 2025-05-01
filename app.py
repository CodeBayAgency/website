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

@app.route('/services/website-building')
def website_building():
    """Website building service page"""
    return render_template('index.html')

@app.route('/coming-soon')
def coming_soon():
    """Coming soon page for services under development"""
    return render_template('coming_soon.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject', 'Contact Form Submission')
        message = request.form.get('message')
        
        # In a real application, you would send the email using a service
        # For now, we'll just log the details
        logging.info(f"Contact form submission: {name} ({email}): {subject} - {message}")
        
        # Flash a success message
        flash('Thank you for your message! We will get back to you soon.', 'success')
        
        # Determine which page the form was submitted from
        referrer = request.referrer or ''
        if 'website-building' in referrer:
            return redirect(url_for('website_building', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash('There was an error processing your request. Please try again.', 'error')
        
        # Determine which page the form was submitted from
        referrer = request.referrer or ''
        if 'website-building' in referrer:
            return redirect(url_for('website_building', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
