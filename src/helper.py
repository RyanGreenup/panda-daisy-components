import os
import re

def replace_imports_in_file(file_path, directories):
    # Define the regex pattern dynamically based on the directories
    base_pattern = r'import\s+{\s*\w+(?:,\s*\w+)*\s*}\s+from\s+[\'"]'
    regex_patterns = [
        re.compile(base_pattern + r'[.\/]+' + re.escape(dir) + r'[\'"];')
        for dir in directories
    ]

    # Define the new import paths based on the matched directory
    def get_new_import(match, directory):
        imports = match.group(1)
        return f'import {{ {imports} }} from "@ryangreenup/panda-daisy-components-styled-system/{directory}";'

    # Open and read the file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Iterate over each pattern/directory and perform replacements
    for dir, pattern in zip(directories, regex_patterns):
        content = pattern.sub(lambda m: get_new_import(m, dir), content)

    # Write the modified content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_directory(directory, directories):
    # Walk through the directory and process each file
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                replace_imports_in_file(file_path, directories)

if __name__ == "__main__":
    directories_to_replace = ["css", "tokens", "types", "patterns", "recipes", "jsx"]
    # Process the current directory or specify a different path
    process_directory(".", directories_to_replace)
