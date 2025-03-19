# Add Speaker, Conversation, and Utterance Content Types

## Description

This pull request adds three content types to the Strapi CMS for the speakerId app:

1. **Speaker** - Stores information about individual speakers
2. **Conversation** - Stores metadata about conversation recordings
3. **Utterance** - Stores individual speech segments with speaker attribution

These content types are designed based on the data structure in the speakerId app's metadata.json file and include all necessary fields and relationships to properly model the data.

## Changes

- Created Speaker content type with name, description, and relationships to Conversations and Utterances
- Created Conversation content type with conversation_id, original_audio, date_processed, duration_seconds, and relationships to Speakers and Utterances
- Created Utterance content type with utterance_id, timing information, text, confidence, embedding_id, audio_file, and relationships to Speaker and Conversation
- Added test script to validate content type definitions and relationships
- Ensured proper relationship configuration between all content types

## Testing

All content types have been tested using the included test-content-types.js script, which validates:
- Required fields are present in each content type
- Relationships are properly defined
- Relationship consistency between content types

All tests pass successfully.

## Usage

To use these content types, the Strapi server must be running in development mode. In production mode, content type editing is disabled.

Once deployed, these content types will allow the speakerId app to store and manage:
- Speaker information
- Conversation recordings and metadata
- Individual utterances with speaker attribution
- Relationships between speakers, conversations, and utterances

## Note

This implementation follows the structure defined in the speakerId app's metadata.json file and provides a complete database schema for the application.
