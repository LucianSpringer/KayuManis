import { Product } from '../../../types';

interface ValidationResult {
    isValid: boolean;
    errors: string[];
    riskScore: number; // 0 - 100
}

/**
 * TaxonomyValidator
 * * A Data Integrity Guard.
 * * Validates that products entering the Transaction Ledger comply with strict schema rules.
 */
export class TaxonomyValidator {
    private static instance: TaxonomyValidator;

    // Regex for SKU validation (Format: AAA-123)
    private readonly SKU_PATTERN = /^[A-Z]{3}-\d+$/;

    private constructor() { }

    public static getInstance(): TaxonomyValidator {
        if (!TaxonomyValidator.instance) {
            TaxonomyValidator.instance = new TaxonomyValidator();
        }
        return TaxonomyValidator.instance;
    }

    public validateProductIntegrity(product: Product): ValidationResult {
        const errors: string[] = [];
        let riskScore = 0;

        // 1. Price Integrity Check
        if (product.price <= 0) {
            errors.push("Zero or negative price detected.");
            riskScore += 100;
        }

        // 2. Data Completeness
        if (!product.name || product.name.length < 3) {
            errors.push("Product name metadata insufficient.");
            riskScore += 20;
        }

        // 3. Category Heuristic Check
        const validCategories = ['Bread', 'Cake', 'Pastry', 'Snack'];
        if (!validCategories.includes(product.category)) {
            errors.push(`Invalid taxonomy node: ${product.category}`);
            riskScore += 50;
        }

        return {
            isValid: errors.length === 0,
            errors,
            riskScore
        };
    }
}
