# Instructions for GitHub Copilot

## Instructions for Creating a Pull Request (PR)

1. **Check if the PR addresses an issue**:

   - Does this PR respond to an existing issue? If yes:
     - Provide the link to the issue.
     - Summarize the content of the issue.

2. **Describe the changes made**:

   - Clearly explain what has been done to address the issue or implement the feature.
   - Use the following command to generate a `git diff` and include it in your response:
     ```bash
     git diff main...your-branch-name
     ```

3. **Ask questions about the implementation**:

   - Are there any areas of the code that need further clarification?
   - Are there any potential improvements or alternative approaches to consider?

4. **Use the PR template**:

   - When creating the PR, use the `.github/PULL_REQUEST_TEMPLATE.md` file as the template.
   - Ensure the PR is written in English, with a professional and direct tone.

5. **Submit the PR**:
   - Double-check the content of the PR for clarity and completeness before submission.
