# SaaSBooks Finance Module

This directory contains the core financial data processing logic for SaaSBooks, following a file-based architecture.

## Architecture Overview

SaaSBooks uses a file-based approach for financial data:

1. **Raw Files as Source of Truth**: All financial data (Stripe, Mercury, etc.) is stored as raw CSV/JSON files in the user's Google Drive, never in the database.

2. **On-Demand Processing**: When generating reports or dashboards, we parse and categorize the financial data on-demand.

3. **Rule-Based Categorization**: A central rule engine determines transaction categories, types, and other attributes.

4. **Stateless Processing**: Categorization is stateless, allowing rules to evolve without requiring data migration.

## Directory Structure

- `/categorization`: Rule engine and categorization logic
- `/imports`: Logic for importing data from various sources (Stripe, Mercury, CSV)
- `/parsers`: File parsers for different formats (CSV, JSON) and providers
- `/metrics`: Financial metrics calculations (MRR, CAC, LTV, etc.)

## Benefits

1. **Automatic Improvements**: When we improve categorization rules, all historical data immediately benefits.

2. **Data Ownership**: Raw financial data remains in the user's Google Drive.

3. **Flexibility**: Easy to add new rules or adjust existing ones without migrations.

4. **Transparency**: Users can always see the raw data vs. processed data.

## Flow Examples

### Import Flow

1. User uploads CSV from Stripe or connects API
2. Raw file is stored in Google Drive
3. File metadata is indexed in the database
4. Preview shows categorized data using the rule engine

### Report Generation Flow

1. User requests a financial report
2. System finds all relevant source files
3. Files are parsed and processed through the rule engine
4. Results are aggregated into the requested report format

## Best Practices

1. Cache processed results where appropriate for performance
2. Index imported files to avoid duplication
3. Keep rule engine maintainable and testable
4. Implement both pattern matching and ML-based categorization
5. Log categorization decisions for debugging and improvement
