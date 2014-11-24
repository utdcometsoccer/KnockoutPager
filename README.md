KnockoutPager
=============
By No means a finished product! 
Extends KnockoutJS ObservableArray
Adds properties:
pageSize, start, pages, isPaged, and currentIndex.
In addition adds computed observables currentPage and pagedData as well as methods
Next, Back, and SetPage.

Binding may look like this if array is named "sizes"

<table>
                <thead>
                    <tr>
                        <th>Culture</th>
                        <th>Sex</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: sizes.pagedData()">
                    <tr>
                        <td data-bind="text: culture.name"></td>
                        <td data-bind="text: sex.name"></td>
                        <td data-bind="text: size"></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <a data-bind="click: sizes.Next(), attr:{href:'#'}">Next</a>
                        </td>
                        <td>
                            <a data-bind="click: sizes.Back(), attr:{href:'#'}">Back</a>
                        </td>
                    </tr>
                </tfoot>
            </table>

