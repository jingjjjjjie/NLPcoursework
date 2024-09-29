var fileUploadLimit =
{};

/**
 * Displays the max upload file size exceeded dialog.
 */
fileUploadLimit.showFileUploadLimitExceededDialog = function( files )
{
  // Build list of files exceeding max upload file size
  var filesExceedingSizeLimit =$j( '<ul/>' );
  for ( const file of files  )
  {
    filesExceedingSizeLimit.append( '<li>' + file + '</li>' )
  }

  // Build dialog body content
  var filesExceedingLimit = page.bundle.getString( 'fileUploadLimitDialog.filesExceedingLimit' );
  var suggestion = page.bundle.getString( 'fileUploadLimitDialog.suggestion' );
  var htmlTemplate = `<div><p>${filesExceedingLimit}</p><br/> ${filesExceedingSizeLimit[0].outerHTML}<br/><p>${suggestion}</p></div>`;

  // Show dialog
  bb_dialogs.bb_confirm({
     title: page.bundle.getString( 'fileUploadLimitDialog.title' ),
     dialogClass: 'bb-dialog bbFileUploadLimitDialogJs',
     html: htmlTemplate,
     buttons: [{
       text: page.bundle.getString( 'fileUploadLimitDialog.button.ok' )
     }]
   });
};