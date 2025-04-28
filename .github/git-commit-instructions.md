# Git Commit Instructions

To ensure consistency and readability in commit messages, please follow these guidelines:

1. **Follow Conventional Commits**  
   Use the following structure for commit messages:

   ```
   <type>: <description>
   ```

   - `type`: The type of change being committed. Use one of the following:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation changes
     - `style`: Code style changes (formatting, missing semi-colons, etc.)
     - `refactor`: Code refactoring (neither fixes a bug nor adds a feature)
     - `test`: Adding or updating tests
     - `chore`: Maintenance tasks (e.g., build process, dependencies)
   - Avoid using a scope (e.g., `feat(ui): ...` → **Not allowed**).

2. **Write in English**  
   All commit messages must be written in English.

3. **Limit the message to 100 characters**  
   The `<description>` part of the commit message must not exceed 100 characters.

4. **Examples**

   - `feat: add user authentication`
   - `fix: resolve login page crash`
   - `docs: update README with installation instructions`
   - `style: format code with Prettier`
   - `refactor: simplify API request logic`
   - `test: add unit tests for user service`
   - `chore: update dependencies`

5. **Additional Notes**
   - Use the imperative mood in the description (e.g., "add" instead of "added" or "adds").
   - Avoid unnecessary punctuation at the end of the message.

By following these rules, we ensure that our commit history remains clean, consistent, and easy to understand.
