import pool from './db';
import fs from 'fs';
import path from 'path';

/**
 * Executes an SQL script from a file
 * @param {string} filePath - The path to the SQL file
 */
async function runSQLFile(filePath) {
    const sql = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        console.log(`Executed SQL script: ${filePath}`);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(`Failed to execute ${filePath}:`, err.message);
    } finally {
        client.release();
    }
}

runSQLFile('script.sql');
