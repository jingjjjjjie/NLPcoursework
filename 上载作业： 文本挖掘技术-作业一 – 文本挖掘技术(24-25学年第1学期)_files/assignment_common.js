var assignment_common =
{
  isWarningShown : Boolean,
  warningMessage : String
};

assignment_common.onAttachCallBack = function(filePicker, isLocal, row)
{
  assignment_common.isWarningShown = false;
  var linkTitleFields = filePicker.listHtmlDiv.getElementsBySelector('input[name=newFile_linkTitle]');

  if (linkTitleFields && linkTitleFields.length > 0)
  {
    for (var i = 0; i < linkTitleFields.length; i++)
    {
      var linkTitleField = linkTitleFields[i];
      var fileName = linkTitleField.value;
      if(linkTitleFields[i].hasAttribute("is-new-file") && linkTitleFields[i].getAttribute("is-new-file") === "true")
      {
        //the AssignmentDWRFacade.js should be imported.
        AssignmentDWRFacade.getSafeFileName(fileName, assignment_common.getCallBackFunction(fileName, linkTitleFields, i));
      }
    }
  }
};

assignment_common.getCallBackFunction = function(fileName, linkTitleFields, index)
{
  /* Even when this assignment seems redundant, this function will be called asynchronously,
     so index could have an unwanted value, for that reason innerIndex is created */
  var innerIndex = index;

  return function (newFileName) {
    var innerlinkTitleField = linkTitleFields[innerIndex];
    if (newFileName && newFileName != fileName)
    {
      if (innerlinkTitleField)
      {
        innerlinkTitleField.value = newFileName;
      }
      if (!assignment_common.isWarningShown)
      {
        new page.InlineConfirmation("warning", assignment_common.warningMessage, false, false);
        assignment_common.isWarningShown = true;
      }
    }
  };
};