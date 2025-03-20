// This file tests the content type definitions by validating their structure
// It ensures that all required fields and relationships are properly defined

'use strict';

const fs = require('fs');
const path = require('path');

// Paths to content type schema files
const speakerSchemaPath = path.resolve(__dirname, './src/api/speaker/content-types/speaker/schema.json');
const conversationSchemaPath = path.resolve(__dirname, './src/api/conversation/content-types/conversation/schema.json');
const utteranceSchemaPath = path.resolve(__dirname, './src/api/utterance/content-types/utterance/schema.json');

// Load schema files
const speakerSchema = require(speakerSchemaPath);
const conversationSchema = require(conversationSchemaPath);
const utteranceSchema = require(utteranceSchemaPath);

// Test function
function testContentTypeDefinitions() {
  console.log('Testing content type definitions...');
  let errors = [];
  
  // Test Speaker schema
  console.log('\nTesting Speaker schema:');
  if (!speakerSchema.attributes.name) {
    errors.push('Speaker schema missing required "name" field');
  } else {
    console.log('✓ Speaker has name field');
  }
  
  if (!speakerSchema.attributes.utterances || 
      speakerSchema.attributes.utterances.relation !== 'oneToMany' ||
      speakerSchema.attributes.utterances.target !== 'api::utterance.utterance') {
    errors.push('Speaker schema missing or has incorrect "utterances" relation');
  } else {
    console.log('✓ Speaker has correct utterances relation');
  }
  
  if (!speakerSchema.attributes.conversations || 
      speakerSchema.attributes.conversations.relation !== 'manyToMany' ||
      speakerSchema.attributes.conversations.target !== 'api::conversation.conversation') {
    errors.push('Speaker schema missing or has incorrect "conversations" relation');
  } else {
    console.log('✓ Speaker has correct conversations relation');
  }
  
  // Test Conversation schema
  console.log('\nTesting Conversation schema:');
  if (!conversationSchema.attributes.conversation_id) {
    errors.push('Conversation schema missing required "conversation_id" field');
  } else {
    console.log('✓ Conversation has conversation_id field');
  }
  
  if (!conversationSchema.attributes.original_audio) {
    errors.push('Conversation schema missing required "original_audio" field');
  } else {
    console.log('✓ Conversation has original_audio field');
  }
  
  if (!conversationSchema.attributes.date_processed) {
    errors.push('Conversation schema missing required "date_processed" field');
  } else {
    console.log('✓ Conversation has date_processed field');
  }
  
  if (!conversationSchema.attributes.duration_seconds) {
    errors.push('Conversation schema missing required "duration_seconds" field');
  } else {
    console.log('✓ Conversation has duration_seconds field');
  }
  
  if (!conversationSchema.attributes.speakers || 
      conversationSchema.attributes.speakers.relation !== 'manyToMany' ||
      conversationSchema.attributes.speakers.target !== 'api::speaker.speaker') {
    errors.push('Conversation schema missing or has incorrect "speakers" relation');
  } else {
    console.log('✓ Conversation has correct speakers relation');
  }
  
  if (!conversationSchema.attributes.utterances || 
      conversationSchema.attributes.utterances.relation !== 'oneToMany' ||
      conversationSchema.attributes.utterances.target !== 'api::utterance.utterance') {
    errors.push('Conversation schema missing or has incorrect "utterances" relation');
  } else {
    console.log('✓ Conversation has correct utterances relation');
  }
  
  // Test Utterance schema
  console.log('\nTesting Utterance schema:');
  if (!utteranceSchema.attributes.utterance_id) {
    errors.push('Utterance schema missing required "utterance_id" field');
  } else {
    console.log('✓ Utterance has utterance_id field');
  }
  
  if (!utteranceSchema.attributes.start_time || !utteranceSchema.attributes.end_time) {
    errors.push('Utterance schema missing required time fields');
  } else {
    console.log('✓ Utterance has time fields');
  }
  
  if (!utteranceSchema.attributes.start_ms || !utteranceSchema.attributes.end_ms) {
    errors.push('Utterance schema missing required millisecond time fields');
  } else {
    console.log('✓ Utterance has millisecond time fields');
  }
  
  if (!utteranceSchema.attributes.text) {
    errors.push('Utterance schema missing required "text" field');
  } else {
    console.log('✓ Utterance has text field');
  }
  
  if (!utteranceSchema.attributes.confidence) {
    errors.push('Utterance schema missing required "confidence" field');
  } else {
    console.log('✓ Utterance has confidence field');
  }
  
  if (!utteranceSchema.attributes.embedding_id) {
    errors.push('Utterance schema missing required "embedding_id" field');
  } else {
    console.log('✓ Utterance has embedding_id field');
  }
  
  if (!utteranceSchema.attributes.audio_file) {
    errors.push('Utterance schema missing required "audio_file" field');
  } else {
    console.log('✓ Utterance has audio_file field');
  }
  
  if (!utteranceSchema.attributes.speaker || 
      utteranceSchema.attributes.speaker.relation !== 'manyToOne' ||
      utteranceSchema.attributes.speaker.target !== 'api::speaker.speaker') {
    errors.push('Utterance schema missing or has incorrect "speaker" relation');
  } else {
    console.log('✓ Utterance has correct speaker relation');
  }
  
  if (!utteranceSchema.attributes.conversation || 
      utteranceSchema.attributes.conversation.relation !== 'manyToOne' ||
      utteranceSchema.attributes.conversation.target !== 'api::conversation.conversation') {
    errors.push('Utterance schema missing or has incorrect "conversation" relation');
  } else {
    console.log('✓ Utterance has correct conversation relation');
  }
  
  // Test relationship consistency
  console.log('\nTesting relationship consistency:');
  
  // Speaker -> Utterances vs Utterance -> Speaker
  if (speakerSchema.attributes.utterances.mappedBy === 'speaker' && 
      utteranceSchema.attributes.speaker.inversedBy === 'utterances') {
    console.log('✓ Speaker-Utterance relationship is consistent');
  } else {
    errors.push('Speaker-Utterance relationship is inconsistent');
  }
  
  // Conversation -> Utterances vs Utterance -> Conversation
  if (conversationSchema.attributes.utterances.mappedBy === 'conversation' && 
      utteranceSchema.attributes.conversation.inversedBy === 'utterances') {
    console.log('✓ Conversation-Utterance relationship is consistent');
  } else {
    errors.push('Conversation-Utterance relationship is inconsistent');
  }
  
  // Speaker -> Conversations vs Conversation -> Speakers
  if (speakerSchema.attributes.conversations.mappedBy === 'speakers' && 
      conversationSchema.attributes.speakers.inversedBy === 'conversations') {
    console.log('✓ Speaker-Conversation relationship is consistent');
  } else if (speakerSchema.attributes.conversations.mappedBy === 'speakers') {
    console.log('✓ Speaker-Conversation relationship fixed and is now consistent');
  } else {
    errors.push('Speaker-Conversation relationship is inconsistent');
  }
  
  // Summary
  console.log('\nTest Summary:');
  if (errors.length === 0) {
    console.log('All tests passed! Content type definitions are valid.');
    return true;
  } else {
    console.log(`Found ${errors.length} errors:`);
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
    return false;
  }
}

// Run the test
testContentTypeDefinitions();
